

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // CHỨC NĂNG MỚI: XỬ LÝ NÚT QUAY LẠI
    // ===========================================
    const backButton = document.getElementById('backToAdminDashboard');

    if (backButton) {
        backButton.addEventListener('click', function() {
            // Chuyển hướng người dùng về trang Dashboard chính
            window.location.href = 'admin_dashboard.html'; 
            
            // Hoặc sử dụng history.back() nếu bạn muốn quay lại trang trước đó
            // history.back(); 
        });
    }


    // ===========================================
    // CHỨC NĂNG 1: XỬ LÝ ĐĂNG XUẤT (Logout)
    // ===========================================
    // Lưu ý: Đảm bảo phần tử này (ID: logoutBtn) tồn tại trong HTML Admin
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log('Đang đăng xuất...');
            
            // Xóa phiên đăng nhập khỏi Local Storage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserRole'); 
            
            // Chuyển hướng người dùng về trang chính (index.html)
            window.location.href = 'index.html'; 
        });
    }

    // ===========================================
    // CHỨC NĂNG 2: XỬ LÝ BIỂU ĐỒ DOANH THU ĐỘNG (Chart.js)
    // ===========================================
    
    // Dữ liệu giả định
    const labels = ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'];
    const revenueData = [25000000, 32000000, 45000000, 38000000, 55000000, 61000000]; 

    const data = {
        labels: labels,
        datasets: [{
            label: 'Doanh Thu (VNĐ)',
            data: revenueData,
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderColor: 'rgb(52, 152, 219)', 
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    const config = {
        type: 'line', 
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(0) + ' Tr';
                        }
                    }
                }
            }
        }
    };

    // Khởi tạo biểu đồ
    const revenueChartCtx = document.getElementById('revenueChart');
    // Kiểm tra tồn tại để tránh lỗi nếu đang ở trang manage_users.html
    if (revenueChartCtx) {
        revenueChartCtx.style.height = '350px'; 
        // Đảm bảo thư viện Chart.js đã được nhúng vào admin_dashboard.html
        new Chart(revenueChartCtx, config); 
    }
    
    
    // ===========================================
    // CHỨC NĂNG 3: QUẢN LÝ NGƯỜI DÙNG VÀ LỊCH ĐẶT
    // ===========================================
    
    // Lấy các phần tử từ manage_users.html
    const userTableBody = document.querySelector('#user-list-table tbody');
    const bookingDetailsSection = document.getElementById('user-booking-details');
    const bookingDetailsBody = document.querySelector('#booking-details-table tbody');
    const currentUserNameSpan = document.getElementById('current-user-name');
    const noBookingsMessage = document.getElementById('no-bookings-message');
    
    const BOOKING_STORAGE_KEY = 'bookings'; // Key lưu lịch đặt sân

    // Hàm Hiển thị chi tiết lịch đặt của người dùng được chọn
    function showUserBookings(event) {
        // Kiểm tra an toàn trước khi truy cập
        if (!bookingDetailsBody || !bookingDetailsSection) return;

        const targetFullname = event.currentTarget.dataset.fullname; 
        
        bookingDetailsBody.innerHTML = ''; 
        currentUserNameSpan.textContent = targetFullname;
        bookingDetailsSection.style.display = 'block'; 

        const bookingsRaw = localStorage.getItem(BOOKING_STORAGE_KEY);
        let bookings = [];

        try {
            bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];
        } catch (e) {
             console.error('Lỗi khi phân tích dữ liệu lịch đặt:', e);
             bookings = [];
        }

        // Lọc lịch đặt chỉ thuộc về người dùng hiện tại
        const userBookings = bookings.filter(booking => 
            // Giả định mỗi lịch đặt có trường 'userFullname' để liên kết
            booking.userFullname === targetFullname 
        );

        if (userBookings.length > 0) {
            noBookingsMessage.style.display = 'none';
            userBookings.forEach(booking => {
                const row = bookingDetailsBody.insertRow();
                
                // Các trường dữ liệu sân
                row.insertCell().textContent = booking.courtName || 'Chưa xác định';
                row.insertCell().textContent = booking.location || 'N/A';
                row.insertCell().textContent = booking.date || 'N/A';
                row.insertCell().textContent = booking.time || 'N/A';
            });
        } else {
            noBookingsMessage.style.display = 'block';
        }
    }

    // Hàm Tải và hiển thị danh sách người dùng
    function loadUserList() {
        // Thoát nếu không phải trang manage_users.html (không tìm thấy bảng)
        if (!userTableBody) return; 
        
        userTableBody.innerHTML = ''; 
        const keys = Object.keys(localStorage);
        let userCount = 0;

        keys.forEach(key => {
    if (key.startsWith('user_')) {
        try {
            const userData = JSON.parse(localStorage.getItem(key));
            
            if (!userData || !userData.fullname) return; 

            // ⭐️ CẬP NHẬT LỌC: Kiểm tra nếu role là 'user' HOẶC role không tồn tại ⭐️
            // Nếu role không tồn tại, chúng ta mặc định coi đó là khách hàng (user).
            const userRole = userData.role || 'user'; // Mặc định là 'user' nếu không có role
            
            if (userRole === 'user') {
                userCount++;
                    
                const row = userTableBody.insertRow();
                
                const fullnameCell = row.insertCell();
                fullnameCell.textContent = userData.fullname;
                
                row.insertCell().textContent = userData.email;
                row.insertCell().textContent = userData.phone;
                row.insertCell().textContent = userRole; // Hiển thị vai trò đã mặc định
                    
                const actionCell = row.insertCell();
                const viewBtn = document.createElement('button');
                viewBtn.textContent = 'Xem Lịch Đặt';
                viewBtn.className = 'view-bookings-btn';
                viewBtn.dataset.fullname = userData.fullname; 
                    
                viewBtn.addEventListener('click', showUserBookings);
                actionCell.appendChild(viewBtn);
            }
            
        } catch (e) {
            console.error('Bỏ qua bản ghi Local Storage bị hỏng:', key);
        }
    }
});

        if (userCount === 0) {
             const row = userTableBody.insertRow();
             const cell = row.insertCell(0);
             cell.colSpan = 5;
             cell.textContent = 'Chưa có tài khoản khách hàng nào được đăng ký.';
        }
    }

    // ⭐️ GỌI HÀM KHI TẢI TRANG ⭐️
    loadUserList(); 
});