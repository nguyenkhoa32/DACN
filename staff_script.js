document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // KHAI BÁO BIẾN VÀ PHẦN TỬ HTML
    // ===========================================
    const BOOKING_STORAGE_KEY = 'bookings';
    const staffNameDisplay = document.getElementById('staffNameDisplay');
    const logoutButton = document.getElementById('logoutBtn');
    const bookingsListBody = document.getElementById('bookingsListBody');
    
    // Các phần tử KPI
    const totalRevenueToday = document.getElementById('totalRevenueToday');
    const totalBookingsToday = document.getElementById('totalBookingsToday');
    const revenueDateSelect = document.getElementById('revenueDateSelect');
    const avgPriceToday = document.getElementById('avgPriceToday'); // KPI mới
    
    let dailyRevenueChart = null; // Biến giữ thể hiện của Chart.js

    // Khởi tạo ngày mặc định là hôm nay
    const today = new Date().toISOString().split('T')[0];
    if (revenueDateSelect) {
        revenueDateSelect.value = today;
    }

    // ===========================================
    // HÀM CHUNG
    // ===========================================
    
    // XỬ LÝ ĐĂNG XUẤT
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserRole'); 
            window.location.href = 'index.html'; 
        });
    }

    // Hàm format số tiền
    function formatCurrency(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0 VNĐ';
        }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    
    // Hàm lấy tên nhân viên (nếu có)
    function loadStaffName() {
        const staffName = localStorage.getItem('currentUser') || 'Nhân Viên';
        if (staffNameDisplay) {
            staffNameDisplay.textContent = staffName;
        }
    }

    // ===========================================
    // HÀM LẤY VÀ LỌC DỮ LIỆU
    // ===========================================
    function getBookingsByDate(selectedDate) {
        const bookingsRaw = localStorage.getItem(BOOKING_STORAGE_KEY);
        let bookings = [];

        try {
            bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];
        } catch (e) {
             console.error('Lỗi khi phân tích dữ liệu lịch đặt:', e);
             return [];
        }

        // Lọc các lịch đặt khớp với ngày
        const filteredBookings = bookings.filter(booking => 
            booking.date === selectedDate 
        );

        return filteredBookings;
    }
    
    // ===========================================
    // HÀM HIỂN THỊ VÀ THỐNG KÊ CHÍNH
    // ===========================================
    function renderStaffDashboard(date) {
        // Thoát nếu không tìm thấy các phần tử quan trọng
        if (!bookingsListBody || !totalRevenueToday || !totalBookingsToday || !avgPriceToday) return;

        const bookingsToday = getBookingsByDate(date);
        
        // 1. Reset bảng
        bookingsListBody.innerHTML = '';
        
        // 2. Tính toán thống kê
        let totalRevenue = 0;
        let timeSlotRevenue = {}; 

        if (bookingsToday.length > 0) {
            bookingsToday.forEach(booking => {
                // Giả định booking.price tồn tại và là số
                const price = parseFloat(booking.price || 0); 
                totalRevenue += price;
                
                // Lấy giờ bắt đầu (vd: "08:00" từ booking.time)
                const hour = booking.time.split(':')[0] + ':00'; 
                timeSlotRevenue[hour] = (timeSlotRevenue[hour] || 0) + price;

                // Thêm hàng vào bảng
                const row = bookingsListBody.insertRow();
                row.insertCell().textContent = booking.userFullname || 'Khách Vãng Lai';
                row.insertCell().textContent = booking.userContact || 'N/A';
                row.insertCell().textContent = booking.courtName;
                row.insertCell().textContent = booking.date;
                row.insertCell().textContent = booking.time;
                row.insertCell().textContent = formatCurrency(price);
                
                const statusCell = row.insertCell();
                statusCell.textContent = booking.status || 'Đã Thanh Toán';
                statusCell.className = 'status-paid';
                
                // Thêm nút Thao tác (chưa có chức năng cụ thể)
                const actionCell = row.insertCell();
                const viewBtn = document.createElement('button');
                viewBtn.textContent = 'Chi tiết';
                viewBtn.className = 'btn-action';
                actionCell.appendChild(viewBtn);

            });
            
            // Tính giá trị trung bình
            const totalBookings = bookingsToday.length;
            const averagePrice = totalBookings > 0 ? totalRevenue / totalBookings : 0;
            avgPriceToday.textContent = formatCurrency(averagePrice);

        } else {
            // Hiển thị thông báo không có lịch đặt
            const row = bookingsListBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 8; // Đảm bảo khớp với số cột mới
            cell.textContent = 'Chưa có lịch đặt nào cho ngày ' + date;
            avgPriceToday.textContent = 'N/A';
        }
        
        // 3. Hiển thị thống kê tổng
        totalRevenueToday.textContent = formatCurrency(totalRevenue);
        totalBookingsToday.textContent = bookingsToday.length;

        // 4. Cập nhật biểu đồ
        updateDailyRevenueChart(timeSlotRevenue);
    }

    // ===========================================
    // HÀM CẬP NHẬT BIỂU ĐỒ DOANH THU THEO GIỜ
    // ===========================================
    function updateDailyRevenueChart(timeSlotRevenue) {
        const ctx = document.getElementById('dailyRevenueChart');
        if (!ctx) return;
        
        // Sắp xếp các mốc giờ
        const sortedHours = Object.keys(timeSlotRevenue).sort();
        const revenues = sortedHours.map(hour => timeSlotRevenue[hour] / 1000000); // Đổi sang Triệu

        if (dailyRevenueChart) {
            dailyRevenueChart.destroy(); // Hủy biểu đồ cũ nếu có
        }
        
        dailyRevenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedHours,
                datasets: [{
                    label: 'Doanh Thu (Triệu VNĐ)',
                    data: revenues,
                    backgroundColor: 'rgba(26, 125, 48, 0.7)', 
                    borderColor: 'rgba(26, 125, 48, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Doanh Thu (Tr VNĐ)' }
                    },
                    x: {
                         title: { display: true, text: 'Khung Giờ' }
                    }
                }
            }
        });
    }

    // ===========================================
    // XỬ LÝ SỰ KIỆN VÀ KHỞI TẠO
    // ===========================================
    
    // Theo dõi sự thay đổi ngày trên input
    if (revenueDateSelect) {
        revenueDateSelect.addEventListener('change', (e) => {
            renderStaffDashboard(e.target.value);
        });
    }

    // Khởi tạo giao diện lần đầu
    loadStaffName();
    renderStaffDashboard(today);
});