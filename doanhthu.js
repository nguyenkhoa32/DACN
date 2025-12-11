// ===============================
// FILE doanhthu.js – FULL VERSION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // 1. LẤY DỮ LIỆU DOANH THU
    // ===============================
    let revenueLog = JSON.parse(localStorage.getItem("revenueLog")) || [];

    let today = new Date();
    let todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    let revenueDay = 0;
    let revenueMonth = 0;
    let revenueYear = 0;
    let ordersCount = revenueLog.length;

    revenueLog.forEach(item => {
        if (item.ngay === todayStr) revenueDay += item.tien;
        if (item.thang === currentMonth && item.nam === currentYear) revenueMonth += item.tien;
        if (item.nam === currentYear) revenueYear += item.tien;
    });

    // ===============================
    // 2. GÁN LÊN GIAO DIỆN
    // ===============================

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = Number(value).toLocaleString("vi-VN") + " VNĐ";
    };

    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = Number(value).toLocaleString("vi-VN");
    };

    setText("revenue-day", revenueDay);
    setText("revenue-month", revenueMonth);
    setText("revenue-year", revenueYear);
    setValue("orders-count", ordersCount);


    // ===============================
    // 3. BIỂU ĐỒ DOANH THU 7 NGÀY
    // ===============================

    // Tạo mảng 7 ngày gần nhất
    let chartLabels = [];
    let chartValues = [];

    for (let i = 6; i >= 0; i--) {
        let d = new Date();
        d.setDate(today.getDate() - i);
        let dStr = d.toISOString().slice(0, 10);

        chartLabels.push(dStr);

        let sum = 0;
        revenueLog.forEach(item => {
            if (item.ngay === dStr) sum += item.tien;
        });

        chartValues.push(sum);
    }

    // Vẽ biểu đồ bằng Chart.js (CDN bạn đã thêm sẵn)
    const ctx = document.getElementById("revenueChart");
    if (ctx) {
        new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [{
                    label: "Doanh thu 7 ngày gần nhất",
                    data: chartValues,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                tension: 0.3,
            }
        });
    }

});
