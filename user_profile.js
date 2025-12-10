document.addEventListener('DOMContentLoaded', function() {

    // --- 1. HÀM HỖ TRỢ DỮ LIỆU ĐÃ SỬA ĐỔI ---
    
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    
    // Hàm mới: Lấy dữ liệu người dùng dưới dạng MẢNG
    function getUsersArray() {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : []; // Trả về MẢNG []
    }

    // Hàm mới: Lưu dữ liệu người dùng dưới dạng MẢNG
    function saveUsersArray(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getBookingsData() {
        const storedBookings = localStorage.getItem('bookings');
        return storedBookings ? JSON.parse(storedBookings) : []; 
    }

    // --- 2. TẢI VÀ HIỂN THỊ THÔNG TIN CÁ NHÂN SỬA ĐỔI ---
    
    let usersArray = getUsersArray(); // Lấy MẢNG
    // Tìm người dùng hiện tại trong MẢNG
    let currentUser = usersArray.find(u => u.email === currentUserEmail); 

    if (!currentUserEmail || !currentUser) {
        console.error("Lỗi đăng nhập: currentUserEmail bị mất hoặc không tìm thấy user.");
        alert("Vui lòng đăng nhập để truy cập trang cá nhân.");
        window.location.href = 'login.html'; 
        return; 
    }
    
    function displayUserInfo() {
        // Sử dụng 'name' hoặc 'fullname' tùy thuộc vào cấu trúc dữ liệu người dùng
        document.getElementById('username-display').textContent = currentUser.name || currentUser.fullname || 'Chưa cập nhật'; 
        document.getElementById('email-display').textContent = currentUser.email || 'N/A';
        document.getElementById('phone-display').textContent = currentUser.phone || 'Chưa cập nhật';
        document.getElementById('address-display').textContent = currentUser.address || 'Chưa cập nhật';
        document.getElementById('join-date').textContent = currentUser.joinDate || 'N/A';
        
        // Hiển thị Avatar
        const avatarImg = document.getElementById('avatar-img');
        if (currentUser.avatar) {
             avatarImg.src = currentUser.avatar;
        } else {
             avatarImg.src = 'default_avatar.png';
        }
    }

    // --- 3. TẢI VÀ HIỂN THỊ LỊCH SỬ ĐẶT SÂN (ĐÃ THÊM LOGIC VAI TRÒ) ---

    function displayBookingHistory() {
        const bookingBody = document.getElementById('booking-body');
        const bookingHeaderRow = document.getElementById('booking-header-row');
        bookingBody.innerHTML = ''; // Xóa dữ liệu cũ
        
        const allBookings = getBookingsData();
        let bookingsToShow = [];
        
        const userRole = currentUser.role || 'user'; // Lấy vai trò (user, staff, admin)

        // Lọc/Chọn booking dựa trên vai trò
        if (userRole === 'staff' || userRole === 'admin') {
            // Staff/Admin: Hiển thị TẤT CẢ booking
            bookingsToShow = allBookings;

            // Cập nhật tiêu đề bảng cho Nhân viên/Admin
            document.querySelector('.right-panel h2').textContent = 'Quản Lý Đơn Đặt Sân Của Khách Hàng';
            // Đảm bảo cột Tên KH được hiển thị (nếu bạn đã thêm nó vào HTML)
        } else {
            // User: Chỉ hiển thị booking của mình
            bookingsToShow = allBookings.filter(b => b.userId === currentUserEmail);

            // Cập nhật tiêu đề bảng cho người dùng
            document.querySelector('.right-panel h2').textContent = 'Thông Tin Đặt Sân Của Bạn';
            // Ẩn cột Tên KH nếu có trong HTML (ví dụ: bằng cách thêm class staff-only vào cột)
        }
        
        if (bookingsToShow.length === 0) {
            bookingBody.innerHTML = `<tr><td colspan="${userRole === 'user' ? 6 : 7}" style="text-align: center; color: #777;">Chưa có lịch sử đặt sân nào.</td></tr>`;
            return;
        }

        // Sắp xếp theo ngày (mới nhất lên đầu)
        bookingsToShow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

        bookingsToShow.forEach(booking => {
            const row = bookingBody.insertRow();
            const formattedDate = booking.ngay ? booking.ngay.split('-').reverse().join('/') : 'N/A';
            
            // 1. THÊM CỘT TÊN KH (Dành riêng cho Staff/Admin)
            if (userRole === 'staff' || userRole === 'admin') {
                // Tạm thời lấy phần trước @ của email nếu không lưu tên đầy đủ trong booking
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
            
            row.classList.add(booking.loaiVe === 'month' ? 'booking-month' : 'booking-hour');
        });
    }

    // --- 4. LOGIC POPUP CHỈNH SỬA (ĐÃ SỬA ĐỂ LƯU VÀO MẢNG) ---
    
    const editModal = document.getElementById('edit-modal');
    const editBtn = document.getElementById('edit-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const saveEditBtn = document.getElementById('save-edit');

    // Mở Modal
    editBtn.addEventListener('click', () => {
        document.getElementById('edit-name').value = currentUser.name || currentUser.fullname || ''; 
        document.getElementById('edit-email').value = currentUser.email || '';
        document.getElementById('edit-address').value = currentUser.address || '';
        document.getElementById('edit-phone').value = currentUser.phone || '';
        
        document.getElementById('edit-email').disabled = true;
        
        editModal.style.display = 'flex';
    });

    // Đóng Modal (Giữ nguyên)
    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Lưu thay đổi (Đã sửa để lưu vào MẢNG)
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
            saveUsersArray(usersArray); 
        
            displayUserInfo();
            editModal.style.display = 'none';
            alert('Thông tin cá nhân đã được cập nhật thành công!');
        } else {
             alert('Lỗi hệ thống: Không tìm thấy người dùng để cập nhật.');
        }
    });


    // --- 5. LOGIC THAY ĐỔI AVATAR (ĐÃ SỬA ĐỂ LƯU VÀO MẢNG) ---

    const uploadAvatarInput = document.getElementById('upload-avatar');

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

    // --- 6. XỬ LÝ NÚT QUAY LẠI (Giữ nguyên) ---
    
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });


    // --- 7. KHỞI CHẠY CHỨC NĂNG ---
    displayUserInfo();
    displayBookingHistory();
});


document.addEventListener('DOMContentLoaded', function() {

    const userId = localStorage.getItem('currentUserEmail'); // ID user
    const chatBox = document.getElementById('userChatMessages');
    const chatInput = document.getElementById('userChatInput');
    const sendBtn = document.getElementById('userSendBtn');

    if (!userId) {
        alert("Vui lòng đăng nhập để sử dụng chat.");
        return;
    }

    // Load chat từ localStorage
    function loadChat() {
        const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
        const userChats = allChats[userId] || [];
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
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;
        const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
        if (!allChats[userId]) allChats[userId] = [];
        allChats[userId].push({sender: 'user', message: text, timestamp: Date.now()});
        localStorage.setItem('chats', JSON.stringify(allChats));
        chatInput.value = '';
        loadChat();
    });

    // Tự động load khi mở trang
    loadChat();

});
