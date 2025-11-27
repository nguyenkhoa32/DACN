// ===========================================
// XỬ LÝ ĐĂNG XUẤT (Logout)
// ===========================================
const logoutButton = document.getElementById('logoutBtn');

if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        console.log('Đang đăng xuất...');
        
        // Chuyển hướng người dùng về trang chính (index.html)
        window.location.href = 'index.html'; 
    });
}

// ===========================================
// XỬ LÝ BIỂU ĐỒ DOANH THU ĐỘNG (Chart.js)
// ===========================================

// 1. Dữ liệu giả định
const labels = ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'];
const revenueData = [25000000, 32000000, 45000000, 38000000, 55000000, 61000000]; // Đơn vị: VNĐ

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

// 2. Cấu hình biểu đồ
const config = {
    type: 'line', 
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false // Đã có h3 trong HTML
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Định dạng hiển thị: 25000000 => 25 Tr
                    callback: function(value) {
                        return (value / 1000000).toFixed(0) + ' Tr';
                    }
                }
            }
        }
    }
};

// 3. Khởi tạo biểu đồ khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    const revenueChartCtx = document.getElementById('revenueChart');
    if (revenueChartCtx) {
        // Đặt chiều cao cho canvas
        revenueChartCtx.style.height = '350px'; 
        
        new Chart(
            revenueChartCtx,
            config
        );
    }
});