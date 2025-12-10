// =========================================================
// admin_script.js - PHIÊN BẢN ĐÃ CẬP NHẬT (FIX LỖI TẢI USER VÀ THÊM CHỨC NĂNG XÓA)
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- KHAI BÁO CÁC PHẦN TỬ CHUNG ---
    const backButton = document.getElementById('backToAdminDashboard');
    const logoutButton = document.getElementById('logoutBtn');
    
    // --- CÁC HÀM HỖ TRỢ DỮ LIỆU CHUNG (Dùng key 'users') ---
    
    const USER_STORAGE_KEY = 'users';
    const BOOKING_STORAGE_KEY = 'bookings';

    function getUsersArray() {
        const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
        // Lưu ý: Nếu user được lưu rải rác, cần hàm chuyển đổi 1 lần
        return storedUsers ? JSON.parse(storedUsers) : []; 
    }

    function saveUsersArray(users) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    }

    function getBookingsData() {
        const storedBookings = localStorage.getItem(BOOKING_STORAGE_KEY);
        return storedBookings ? JSON.parse(storedBookings) : []; 
    }

    
    // ===========================================
    // CHỨC NĂNG CHUNG: QUAY LẠI VÀ ĐĂNG XUẤT
    // ===========================================
    
    // Xử lý nút Quay Lại
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Giữ nguyên logic cũ của bạn
            window.location.href = 'admin_dashboard.html'; 
        });
    }

    // Xử lý nút Đăng Xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log('Đang đăng xuất...');
            localStorage.removeItem('currentUserEmail'); // Sửa thành key Email nếu bạn dùng
            localStorage.removeItem('currentUserRole'); 
            window.location.href = 'index.html'; 
        });
    }


    // ===========================================
    // CHỨC NĂNG 2: XỬ LÝ BIỂU ĐỒ DOANH THU ĐỘNG (Chart.js) - GIỮ NGUYÊN
    // ===========================================
    
    // [Giữ nguyên logic Chart.js của bạn]
    const labels = ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'];
    const revenueData = [25000000, 32000000, 45000000, 38000000, 55000000, 61000000]; 

    const data = { /* ... cấu hình data Chart ... */ labels: labels, datasets: [{ label: 'Doanh Thu (VNĐ)', data: revenueData, backgroundColor: 'rgba(52, 152, 219, 0.5)', borderColor: 'rgb(52, 152, 219)', borderWidth: 2, fill: true, tension: 0.4 }] };

    const config = { /* ... cấu hình config Chart ... */ type: 'line', data: data, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return (value / 1000000).toFixed(0) + ' Tr'; } } } } } };

    const revenueChartCtx = document.getElementById('revenueChart');
    if (revenueChartCtx) {
        revenueChartCtx.style.height = '350px'; 
         new Chart(revenueChartCtx, config); // Bỏ comment nếu đã nhúng thư viện Chart.js
    }
    
    
    // ===========================================
    // CHỨC NĂNG 3: QUẢN LÝ NGƯỜI DÙNG VÀ LỊCH ĐẶT (ĐÃ SỬA LỖI LỌC VÀ THÊM XÓA)
    // ===========================================
    
    const userTableBody = document.querySelector('#user-list-table tbody');
    const bookingDetailsSection = document.getElementById('user-booking-details');
    const bookingDetailsBody = document.querySelector('#booking-details-table tbody');
    const currentUserNameSpan = document.getElementById('current-user-name');
    const noBookingsMessage = document.getElementById('no-bookings-message');
    
    // --- HÀM XỬ LÝ XÓA NGƯỜI DÙNG ---
    function handleDeleteUser(email) {
        if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản ${email} không? Hành động này sẽ xóa vĩnh viễn.`)) {
            return;
        }
        
        let users = getUsersArray();
        const initialLength = users.length;
        
        // Lọc ra người dùng cần xóa
        const updatedUsers = users.filter(u => u.email !== email);
        
        if (updatedUsers.length < initialLength) {
            saveUsersArray(updatedUsers);
            alert(`Đã xóa tài khoản ${email} thành công.`);
            
            // Ẩn chi tiết booking và tải lại danh sách
            if (bookingDetailsSection) bookingDetailsSection.style.display = 'none';
            loadUserList(); 
        } else {
            alert('Lỗi: Không tìm thấy người dùng để xóa.');
        }
    }

    // --- HÀM GẮN SỰ KIỆN CHO CÁC NÚT ĐỘNG ---
    function attachUserListEventListeners() {
        // Gắn sự kiện Xem lịch đặt
        document.querySelectorAll('.view-bookings-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                // Lấy email từ data-email thay vì fullname
                const userEmail = this.dataset.email; 
                const userName = this.dataset.fullname; 
                showUserBookings(userEmail, userName);
            });
        });
        
        // Gắn sự kiện Xóa
        document.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                const emailToDelete = this.dataset.email;
                handleDeleteUser(emailToDelete);
            });
        });
    }

    // --- HÀM HIỂN THỊ CHI TIẾT LỊCH ĐẶT ---
    // Đã thay đổi tham số từ event sang email, fullname
    function showUserBookings(userEmail, userName) {
        if (!bookingDetailsBody || !bookingDetailsSection) return;

        bookingDetailsBody.innerHTML = ''; 
        currentUserNameSpan.textContent = userName;
        bookingDetailsSection.style.display = 'block'; 

        const bookings = getBookingsData();

        // ⭐️ Lọc lịch đặt bằng EMAIL (ID DUY NHẤT) ⭐️
        const userBookings = bookings.filter(booking => booking.userId === userEmail);

        if (userBookings.length > 0) {
            noBookingsMessage.style.display = 'none';
            
            // Sắp xếp theo ngày
            userBookings.sort((a, b) => new Date(b.ngay) - new Date(a.ngay));

            userBookings.forEach(booking => {
                const row = bookingDetailsBody.insertRow();
                
                // Sử dụng các trường dữ liệu booking của bạn
                row.insertCell().textContent = booking.tenSan || 'Chưa xác định';
                row.insertCell().textContent = booking.diaDiem || 'N/A'; // Cần đảm bảo bạn lưu trường này
                row.insertCell().textContent = booking.ngay || 'N/A';
                row.insertCell().textContent = booking.gio || 'N/A';
                // Thêm các cột khác nếu cần: số vé, thanh toán...
            });
        } else {
            noBookingsMessage.style.display = 'block';
        }
    }

    // --- HÀM TẢI VÀ HIỂN THỊ DANH SÁCH NGƯỜI DÙNG (FIX LỖI) ---
    function loadUserList() {
        if (!userTableBody) return; 
        
        userTableBody.innerHTML = ''; 
        const usersArray = getUsersArray();
        let userCount = 0;

        // Lọc chỉ lấy người dùng có role 'user'
        const usersToDisplay = usersArray.filter(u => (u.role || 'user') === 'user');

        if (usersToDisplay.length === 0) {
            const row = userTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5;
            cell.textContent = 'Chưa có tài khoản khách hàng nào được đăng ký.';
        } else {
            usersToDisplay.forEach(userData => {
                userCount++;
                const row = userTableBody.insertRow();
                const userFullname = userData.fullname || userData.name || 'N/A';
                
                row.insertCell().textContent = userFullname;
                row.insertCell().textContent = userData.email || 'N/A';
                row.insertCell().textContent = userData.phone || 'N/A';
                row.insertCell().textContent = userData.role || 'user'; 
                
                const actionCell = row.insertCell();
                actionCell.className = 'admin-actions';
                
                // Nút Xem
                const viewBtn = document.createElement('button');
                viewBtn.textContent = 'Xem Lịch Đặt';
                viewBtn.className = 'view-bookings-btn';
                viewBtn.dataset.email = userData.email; // Lưu email để liên kết booking
                viewBtn.dataset.fullname = userFullname;
                
                // Nút Xóa
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Xóa';
                deleteBtn.className = 'delete-user-btn';
                deleteBtn.dataset.email = userData.email;
                
                actionCell.appendChild(viewBtn);
                actionCell.appendChild(deleteBtn);
            });
        }

        attachUserListEventListeners(); // Gắn lại sự kiện sau khi render
    }

    // ⭐️ GỌI HÀM KHI TẢI TRANG ⭐️
    loadUserList(); 
});