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
        // Logic hiển thị giữ nguyên
        document.getElementById('username-display').textContent = currentUser.name || currentUser.fullname || 'Chưa cập nhật'; // Thêm fallback cho fullname
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

    // --- 3. TẢI VÀ HIỂN THỊ LỊCH SỬ ĐẶT SÂN (OK) ---

    function displayBookingHistory() {
        const bookingBody = document.getElementById('booking-body');
        bookingBody.innerHTML = ''; 
        
        const allBookings = getBookingsData();
        // Lọc các booking thuộc về người dùng hiện tại
        const userBookings = allBookings.filter(b => b.userId === currentUserEmail);
        
        if (userBookings.length === 0) {
            bookingBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #777;">Chưa có lịch sử đặt sân nào.</td></tr>';
            return;
        }

        // Sắp xếp theo ngày (mới nhất lên đầu)
        userBookings.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

        userBookings.forEach(booking => {
            const row = bookingBody.insertRow();
            
            // Định dạng ngày: YYYY-MM-DD -> DD/MM/YYYY
            const formattedDate = booking.ngay ? booking.ngay.split('-').reverse().join('/') : 'N/A';
            
            row.insertCell().textContent = formattedDate; 
            row.insertCell().textContent = booking.gio;
            row.insertCell().textContent = booking.tenSan;
            row.insertCell().textContent = booking.soSan;
            row.insertCell().textContent = booking.soVe;
            row.insertCell().textContent = booking.thanhToan;
            
            row.classList.add(booking.loaiVe === 'month' ? 'booking-month' : 'booking-hour');
        });
    }

    // --- 4. LOGIC POPUP CHỈNH SỬA ĐÃ SỬA ĐỔI ---
    
    const editModal = document.getElementById('edit-modal');
    const editBtn = document.getElementById('edit-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const saveEditBtn = document.getElementById('save-edit');

    // Mở Modal
    editBtn.addEventListener('click', () => {
        document.getElementById('edit-name').value = currentUser.name || currentUser.fullname || ''; // Dùng name/fullname
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

        // Cập nhật đối tượng currentUser (đang trỏ đến đối tượng trong mảng)
        currentUser.name = newName; // Sửa trường name
        currentUser.fullname = newName; // Sửa thêm trường fullname (nếu có)
        currentUser.address = newAddress;
        currentUser.phone = newPhone;

        // Tìm index trong mảng
        const userIndex = usersArray.findIndex(u => u.email === currentUserEmail);

        if (userIndex !== -1) {
            // Cập nhật lại đối tượng trong mảng (thực ra đã được cập nhật ở trên)
            // usersArray[userIndex] = currentUser; 
            saveUsersArray(usersArray); // Lưu toàn bộ mảng đã được sửa đổi
        
            // Cập nhật giao diện và đóng Modal
            displayUserInfo();
            editModal.style.display = 'none';
            alert('Thông tin cá nhân đã được cập nhật thành công!');
        } else {
             alert('Lỗi hệ thống: Không tìm thấy người dùng để cập nhật.');
        }
    });


    // --- 5. LOGIC THAY ĐỔI AVATAR (Đã sửa để lưu vào MẢNG) ---

    const uploadAvatarInput = document.getElementById('upload-avatar');

    uploadAvatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;

                // Lưu ảnh vào currentUser
                currentUser.avatar = base64Image;
                
                // Tìm index và lưu MẢNG
                const userIndex = usersArray.findIndex(u => u.email === currentUserEmail);
                if (userIndex !== -1) {
                    // usersArray[userIndex] = currentUser; // Đã cập nhật
                    saveUsersArray(usersArray);
                }

                // Cập nhật ngay trên giao diện
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