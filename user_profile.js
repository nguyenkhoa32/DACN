// =========================================================
// user_profile.js - PHIÊN BẢN HOÀN CHỈNH (FIX LỖI NULL VÀ THÊM CHỨC NĂNG HỦY SÂN)
// =========================================================

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. BIẾN & HÀM HỖ TRỢ DỮ LIỆU ---
    
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const COURTS_STORAGE_KEY = 'appCourtsData';
    
    // --- User Data Handlers ---
    function getUsersArray() {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : []; 
    }

    function saveUsersArray(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // --- Booking Data Handlers ---
    function getBookingsData() {
        const storedBookings = localStorage.getItem('bookings');
        return storedBookings ? JSON.parse(storedBookings) : []; 
    }
    
    function saveBookingsData(bookings) {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    // --- Court Data Handlers (Cần cho việc Hoàn vé) ---
    function getCourtsData() {
        const stored = localStorage.getItem(COURTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : []; 
    }
    
    function saveCourtsData(courts) {
        localStorage.setItem(COURTS_STORAGE_KEY, JSON.stringify(courts));
    }


    // --- 2. XỬ LÝ ĐĂNG NHẬP & TẢI THÔNG TIN CÁ NHÂN ---
    
    let usersArray = getUsersArray();
    let currentUser = usersArray.find(u => u.email === currentUserEmail); 

    if (!currentUserEmail || !currentUser) {
        console.error("Lỗi đăng nhập: currentUserEmail bị mất hoặc không tìm thấy user.");
        alert("Vui lòng đăng nhập để truy cập trang cá nhân.");
        window.location.href = 'login.html'; 
        return; 
    }
    
    function displayUserInfo() {
        document.getElementById('username-display').textContent = currentUser.name || currentUser.fullname || 'Chưa cập nhật'; 
        document.getElementById('email-display').textContent = currentUser.email || 'N/A';
        document.getElementById('phone-display').textContent = currentUser.phone || 'Chưa cập nhật';
        document.getElementById('address-display').textContent = currentUser.address || 'Chưa cập nhật';
        document.getElementById('join-date').textContent = currentUser.joinDate || 'N/A';
        
        const avatarImg = document.getElementById('avatar-img');
        if (avatarImg) { // Kiểm tra an toàn
            avatarImg.src = currentUser.avatar || 'default_avatar.png';
        }
    }


    // --- 3. TẢI VÀ HIỂN THỊ LỊCH SỬ ĐẶT SÂN (BAO GỒM NÚT HỦY) ---

    function displayBookingHistory() {
        const bookingBody = document.getElementById('bookingHistoryBody'); // Đã sửa ID theo HTML
        const rightPanelTitle = document.querySelector('.right-panel h2');
        
        if (!bookingBody || !rightPanelTitle) return; // Kiểm tra an toàn

        bookingBody.innerHTML = ''; 
        
        const allBookings = getBookingsData();
        let bookingsToShow = [];
        
        const userRole = currentUser.role || 'user';

        // Lọc/Chọn booking dựa trên vai trò
        if (userRole === 'staff' || userRole === 'admin') {
            bookingsToShow = allBookings;
            rightPanelTitle.textContent = 'Quản Lý Đơn Đặt Sân Của Khách Hàng';
            // Cần sửa HTML để có cột Tên KH (đã xử lý trong HTML mới)
        } else {
            bookingsToShow = allBookings.filter(b => b.userId === currentUserEmail);
            rightPanelTitle.textContent = 'Thông Tin Đặt Sân Của Bạn';
        }
        
        const totalColumns = userRole === 'user' ? 7 : 8; // Ngày, Giờ, Tên sân, Số sân, Số vé, Thanh toán, Thao tác (+ Tên KH nếu là Admin/Staff)

        if (bookingsToShow.length === 0) {
            bookingBody.innerHTML = `<tr><td colspan="${totalColumns}" style="text-align: center; color: #777;">Chưa có lịch sử đặt sân nào.</td></tr>`;
            // Vẫn cần gọi hàm gắn sự kiện để tránh lỗi nếu không có dữ liệu
            attachCancelListeners(); 
            return;
        }

        bookingsToShow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

        bookingsToShow.forEach(booking => {
            const row = bookingBody.insertRow();
            const formattedDate = booking.ngay ? booking.ngay.split('-').reverse().join('/') : 'N/A';
            
            // 1. THÊM CỘT TÊN KH (Dành riêng cho Staff/Admin)
            if (userRole === 'staff' || userRole === 'admin') {
                const customerName = booking.fullname || booking.userId.split('@')[0];
                row.insertCell().textContent = customerName; 
            }
            
            // 2. Các cột còn lại
            row.insertCell().textContent = formattedDate; 
            row.insertCell().textContent = booking.gio;
            row.insertCell().textContent = booking.tenSan;
            row.insertCell().textContent = booking.soSan;
            row.insertCell().textContent = booking.soVe;
            row.insertCell().textContent = booking.thanhToan;
            
            // 3. NÚT THAO TÁC (HỦY SÂN)
            const actionCell = row.insertCell();
            
            // Chỉ cho phép người dùng hủy booking của chính họ
            if (booking.userId === currentUserEmail) {
                 actionCell.innerHTML = `<button class="cancel-booking-btn" data-id="${booking.id}" data-court="${booking.tenSan}" data-tickets="${booking.soVe}">Hủy</button>`;
            } else {
                 actionCell.textContent = '-'; // Staff/Admin không được hủy booking của người khác (có thể thay đổi tùy logic)
            }
            
            row.classList.add(booking.loaiVe === 'month' ? 'booking-month' : 'booking-hour');
        });
        
        attachCancelListeners(); // GỌI HÀM GẮN SỰ KIỆN SAU KHI RENDER
    }
    
    // --- 4. LOGIC XỬ LÝ HỦY SÂN VÀ HOÀN VÉ ---
    
    function handleCancelBooking(bookingId, courtName, ticketsToReturn) {
        if (!confirm(`Bạn có chắc chắn muốn hủy đặt sân ${courtName} (ID: ${bookingId}) không? .`)) {
            return;
        }

        // 1. CẬP NHẬT LỊCH SỬ BOOKING (Xóa)
        let allBookings = getBookingsData();
        const updatedBookings = allBookings.filter(b => b.id != bookingId);
        saveBookingsData(updatedBookings);

        // 2. HOÀN LẠI SỐ VÉ (Cập nhật số lượng vé trong allCourtsData)
        let allCourts = getCourtsData();
        const courtIndex = allCourts.findIndex(c => c.name === courtName);

        if (courtIndex !== -1) {
            // Cộng lại số vé đã hủy vào tổng số vé của sân đó
            allCourts[courtIndex].tickets += Number(ticketsToReturn); 
            saveCourtsData(allCourts); // Lưu lại dữ liệu sân đã hoàn vé
        } else {
            console.warn(`Cảnh báo: Không tìm thấy sân "${courtName}" để hoàn vé.`);
        }

        // 3. CẬP NHẬT GIAO DIỆN
        alert(`Đã hủy đặt sân ${courtName} thành công! Số vé đã được hoàn lại.`);
        displayBookingHistory(); // Tải lại lịch sử đặt sân đã cập nhật
    }

    // --- 5. HÀM GẮN SỰ KIỆN HỦY SÂN (ĐƯỢC GỌI SAU KHI RENDER) ---
    function attachCancelListeners() {
        document.querySelectorAll('.cancel-booking-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookingId = this.getAttribute('data-id');
                const courtName = this.getAttribute('data-court');
                const tickets = this.getAttribute('data-tickets');
                
                handleCancelBooking(Number(bookingId), courtName, tickets); 
            });
        });
    }

    // --- 6. LOGIC POPUP CHỈNH SỬA & AVATAR (GIỮ NGUYÊN) ---
    
    const editModal = document.getElementById('edit-modal');
    const editBtn = document.getElementById('edit-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const saveEditBtn = document.getElementById('save-edit');
    const uploadAvatarInput = document.getElementById('upload-avatar');

    // Mở Modal
    if (editBtn) { // Kiểm tra an toàn
        editBtn.addEventListener('click', () => {
            document.getElementById('edit-name').value = currentUser.name || currentUser.fullname || ''; 
            document.getElementById('edit-email').value = currentUser.email || '';
            document.getElementById('edit-address').value = currentUser.address || '';
            document.getElementById('edit-phone').value = currentUser.phone || '';
            
            document.getElementById('edit-email').disabled = true;
            
            if (editModal) editModal.style.display = 'flex';
        });
    }
    

    // Đóng Modal
    if (closeModalBtn) { // Kiểm tra an toàn
        closeModalBtn.addEventListener('click', () => {
            if (editModal) editModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Lưu thay đổi
    if (saveEditBtn) { // Kiểm tra an toàn
        saveEditBtn.addEventListener('click', () => {
            const newName = document.getElementById('edit-name').value.trim();
            const newAddress = document.getElementById('edit-address').value.trim();
            const newPhone = document.getElementById('edit-phone').value.trim();

            currentUser.name = newName; 
            currentUser.fullname = newName; 
            currentUser.address = newAddress;
            currentUser.phone = newPhone;

            const userIndex = usersArray.findIndex(u => u.email === currentUserEmail);

            if (userIndex !== -1) {
                // usersArray[userIndex] = currentUser; // Đã cập nhật trực tiếp qua tham chiếu, chỉ cần lưu
                saveUsersArray(usersArray); 
            
                displayUserInfo();
                if (editModal) editModal.style.display = 'none';
                alert('Thông tin cá nhân đã được cập nhật thành công!');
            } else {
                alert('Lỗi hệ thống: Không tìm thấy người dùng để cập nhật.');
            }
        });
    }


    // Logic Thay đổi Avatar
    if (uploadAvatarInput) { // Kiểm tra an toàn
        uploadAvatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Image = event.target.result;

                    currentUser.avatar = base64Image;
                    
                    const userIndex = usersArray.findIndex(u => u.email === currentUserEmail);
                    if (userIndex !== -1) {
                        saveUsersArray(usersArray);
                    }

                    document.getElementById('avatar-img').src = base64Image;
                    alert('Ảnh đại diện đã được cập nhật!');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Xử lý nút Quay Lại
    document.getElementById('back-btn')?.addEventListener('click', () => { // Sử dụng Optional Chaining để đảm bảo nút tồn tại
        window.location.href = 'index.html'; 
    });


    // --- 7. LOGIC CHAT (ĐÃ TÍCH HỢP VÀO KHỐI DOMContentLoaded CHUNG) ---
    
    const chatBox = document.getElementById('userChatMessages');
    const chatInput = document.getElementById('userChatInput');
    const sendBtn = document.getElementById('userSendBtn');

    // Load chat từ localStorage
    function loadChat() {
        if (!chatBox) return; // Kiểm tra an toàn
        const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
        const userChats = allChats[currentUserEmail] || []; // Sửa thành currentUserEmail
        chatBox.innerHTML = '';
        userChats.forEach(c => {
            const msgDiv = document.createElement('div');
            msgDiv.className = c.sender === 'user' ? 'chat-message-user' : 'chat-message-staff';
            msgDiv.textContent = c.message;
            chatBox.appendChild(msgDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Gửi tin nhắn
    if (sendBtn) { // Kiểm tra an toàn
        sendBtn.addEventListener('click', () => {
            if (!chatInput) return; // Kiểm tra an toàn
            const text = chatInput.value.trim();
            if (!text) return;
            const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
            if (!allChats[currentUserEmail]) allChats[currentUserEmail] = [];
            allChats[currentUserEmail].push({sender: 'user', message: text, timestamp: Date.now()});
            localStorage.setItem('chats', JSON.stringify(allChats));
            chatInput.value = '';
            loadChat();
        });
    }
    
    
    // --- 8. KHỞI CHẠY CHỨC NĂNG ---
    displayUserInfo();
    displayBookingHistory();
    loadChat(); // Khởi chạy chat (chỉ chạy nếu các phần tử chat có trong HTML)
});