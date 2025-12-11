document.addEventListener('DOMContentLoaded', function() {

    // --- 1. HÀM HỖ TRỢ DỮ LIỆU ---
    function getBookingsData() {
        const storedBookings = localStorage.getItem('bookings');
        return storedBookings ? JSON.parse(storedBookings) : [];
    }

    function getUsersArray() {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    }

    function getUserMap() {
        const usersArray = getUsersArray();
        const userMap = {};
        usersArray.forEach(user => {
            userMap[user.email] = user;
        });
        return userMap;
    }

    // --- 2. HIỂN THỊ TẤT CẢ BOOKING ---
    function displayAllBookings() {
        const bookingBody = document.getElementById('bookingBody');
        if (!bookingBody) return;
        bookingBody.innerHTML = '';

        const allBookings = getBookingsData();
        const userMap = getUserMap();

        if (allBookings.length === 0) {
            bookingBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#777;">Chưa có đơn đặt sân nào.</td></tr>';
            return;
        }

        allBookings.sort((a,b)=>new Date(b.ngay)-new Date(a.ngay));

        allBookings.forEach(booking => {
            const row = bookingBody.insertRow();
            const formattedDate = booking.ngay ? booking.ngay.split('-').reverse().join('/') : 'N/A';
            const customer = userMap[booking.userId];
            const customerName = customer ? (customer.name || customer.fullname) : booking.userId.split('@')[0];

            row.insertCell().textContent = customerName;
            row.insertCell().textContent = formattedDate;
            row.insertCell().textContent = booking.gio;
            row.insertCell().textContent = booking.tenSan;
            row.insertCell().textContent = booking.soSan;
            row.insertCell().textContent = booking.thanhToan;
            row.classList.add(booking.loaiVe==='month'?'booking-month':'booking-hour');
        });
    }

    displayAllBookings();

    // --- 3. DOANH THU ---
    let revenueData = JSON.parse(localStorage.getItem('revenueData')) || {
        day: 0, month: 0, year: 0, orders: 0, visits: 0
    };

    function updateDashboard() {
        if (document.getElementById('revenue-day')) {
            document.getElementById('revenue-day').textContent = revenueData.day.toLocaleString();
            document.getElementById('revenue-month').textContent = revenueData.month.toLocaleString();
            document.getElementById('revenue-year').textContent = revenueData.year.toLocaleString();
            document.getElementById('orders-count').textContent = revenueData.orders;
            document.getElementById('visits-count').textContent = revenueData.visits;
        }

        if (typeof revenueChart !== 'undefined') {
            revenueChart.data.datasets[0].data = [
                revenueData.month, revenueData.month*1.1, revenueData.month*1.2,
                revenueData.month*1.3, revenueData.month*1.4, revenueData.month*1.5
            ];
            revenueChart.update();
        }
    }

    updateDashboard();

    // --- 4. BIỂU ĐỒ CHART.JS ---
    let revenueChart;
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        revenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6'],
                datasets:[{
                    label:'Doanh Thu (VNĐ)',
                    data:[0,0,0,0,0,0],
                    backgroundColor:'rgba(54,162,235,0.2)',
                    borderColor:'rgba(54,162,235,1)',
                    borderWidth:2,
                    fill:true
                }]
            },
            options:{responsive:true,plugins:{legend:{display:false}}}
        });
    }

    // --- 5. HÀM KHI KHÁCH ĐẶT SÂN THÀNH CÔNG ---
    function customerBooking(amount) {
        amount = Number(amount) || 0;

        revenueData.day += amount;
        revenueData.month += amount;
        revenueData.year += amount;
        revenueData.orders += 1;
        revenueData.visits += 1;

        localStorage.setItem('revenueData', JSON.stringify(revenueData));
        updateDashboard();
    }

    // --- 6. TÍNH TỔNG DOANH THU TỪ BOOKINGS ---
    const allBookings = getBookingsData();
    let totalDay = 0, totalMonth = 0, totalYear = 0, totalOrders = 0, totalVisits = 0;
    const today = new Date().toISOString().split('T')[0];

    allBookings.forEach(b=>{
        const bAmount = Number(b.thanhToan) || 0;
        totalMonth += bAmount;
        totalYear += bAmount;
        totalOrders += 1;
        totalVisits += 1;
        if(b.ngay===today) totalDay += bAmount;
    });

    revenueData = { day: totalDay, month: totalMonth, year: totalYear, orders: totalOrders, visits: totalVisits };
    localStorage.setItem('revenueData', JSON.stringify(revenueData));
    updateDashboard();

    window.customerBooking = customerBooking;
});
