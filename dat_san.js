document.addEventListener('DOMContentLoaded', function() {

    // --- 1. HÀM HỖ TRỢ DỮ LIỆU ---
    
    // Hàm lấy toàn bộ dữ liệu đặt sân từ Local Storage
    function getBookingsData() {
        const storedBookings = localStorage.getItem('bookings');
        // Trả về mảng rỗng nếu không có dữ liệu
        return storedBookings ? JSON.parse(storedBookings) : []; 
    }

    // Hàm lấy toàn bộ dữ liệu người dùng (cần để tra cứu tên đầy đủ nếu cần)
    function getUsersArray() {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : []; 
    }
    
    // Chuyển đổi mảng users thành Object Map để tra cứu nhanh hơn
    function getUserMap() {
        const usersArray = getUsersArray();
        const userMap = {};
        usersArray.forEach(user => {
            userMap[user.email] = user;
        });
        return userMap;
    }

    // --- 2. TẢI VÀ HIỂN THỊ TẤT CẢ BOOKING ---

    function displayAllBookings() {
        const bookingBody = document.getElementById('bookingBody');
        bookingBody.innerHTML = ''; // Xóa dữ liệu cũ
        
        const allBookings = getBookingsData();
        const userMap = getUserMap(); // Map để tra cứu tên khách hàng
        
        if (allBookings.length === 0) {
            bookingBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #777;">Chưa có đơn đặt sân nào trong hệ thống.</td></tr>';
            return;
        }

        // Sắp xếp theo ngày (mới nhất lên đầu)
        allBookings.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

        allBookings.forEach(booking => {
            const row = bookingBody.insertRow();
            
            // Định dạng ngày: YYYY-MM-DD -> DD/MM/YYYY
            const formattedDate = booking.ngay ? booking.ngay.split('-').reverse().join('/') : 'N/A';
            
            // Tra cứu thông tin người dùng
            const customer = userMap[booking.userId];
            // Tên Khách Hàng: Ưu tiên tên đầy đủ, nếu không thì dùng phần trước @ của email
            const customerName = customer 
                ? (customer.name || customer.fullname) 
                : booking.userId.split('@')[0];
            
            
            // Cột Tên KH
            row.insertCell().textContent = customerName; 
            
            // Các cột dữ liệu còn lại
            row.insertCell().textContent = formattedDate; 
            row.insertCell().textContent = booking.gio;
            row.insertCell().textContent = booking.tenSan;
            row.insertCell().textContent = booking.soSan;
            row.insertCell().textContent = booking.thanhToan;
            
            // Thêm class để dễ dàng styling (ví dụ: tháng, giờ)
            row.classList.add(booking.loaiVe === 'month' ? 'booking-month' : 'booking-hour');
        });
    }
    
    // --- 3. KIỂM TRA QUYỀN TRUY CẬP (Nếu cần) ---
    
    // Bạn nên thêm logic kiểm tra vai trò người dùng đã đăng nhập (staff) tại đây.
    // Nếu bạn đã đảm bảo việc kiểm tra này được thực hiện trước khi chuyển hướng đến dat_san.html,
    // thì có thể bỏ qua bước này.
    
    /* const currentUserRole = localStorage.getItem('currentUserRole');
    if (currentUserRole !== 'staff' && currentUserRole !== 'admin') {
        alert("Bạn không có quyền truy cập trang này.");
        window.location.href = 'index.html';
        return;
    }
    */
    
    // --- 4. KHỞI CHẠY ---
    displayAllBookings();
    
    // --- 5. QUAY LẠI TRANG NHÂN VIÊN ---
    document.querySelector('.nav a[href="nhanvien.html"]').addEventListener('click', function(e) {
        // Có thể cần logic quay lại dashboard nhân viên
        // e.preventDefault();
        // window.location.href = 'nhanvien.html';
    });
});

