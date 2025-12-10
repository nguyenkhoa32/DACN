// Lượt truy cập khách hàng (đếm số lần vào trang tìm sân / đặt sân)
let luotTruyCap = Number(localStorage.getItem("views")) || 0;

document.getElementById("luotTruyCap").textContent = luotTruyCap + " lượt";
// Lấy booking từ LocalStorage
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Lấy ngày hiện tại
const today = new Date().toISOString().slice(0, 10);

// ===== Tính doanh thu ngày =====
let doanhThuNgay = 0;
let donNgay = 0;

bookings.forEach(b => {
    if (b.ngay === today) {
        donNgay++;
        doanhThuNgay += Number(b.tien || 0);
    }
});

document.getElementById("doanhThuNgay").textContent = doanhThuNgay.toLocaleString() + " đ";
document.getElementById("donNgay").textContent = donNgay + " đơn";

// ===== Lượt truy cập =====
let views = Number(localStorage.getItem("views")) || 0;
document.getElementById("luotTruyCap").textContent = views + " lượt";

// ===== Chuẩn bị dữ liệu cho biểu đồ =====
const labels = [];
const values = [];

for (let i = 6; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    let dateStr = d.toISOString().slice(0, 10);

    labels.push(dateStr);

    let total = 0;
    bookings.forEach(b => {
        if (b.ngay === dateStr) total += Number(b.tien || 0);
    });

    values.push(total);
}

// ===== Vẽ biểu đồ cực đẹp =====
const ctx = document.getElementById("revenueChart").getContext("2d");

// Gradient màu hiện đại
let gradient = ctx.createLinearGradient(0, 0, 0, 350);
gradient.addColorStop(0, "rgba(43, 89, 255, 0.5)");
gradient.addColorStop(1, "rgba(43, 89, 255, 0)");

new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Doanh thu (VND)",
            data: values,
            fill: true,
            backgroundColor: gradient,
            borderColor: "#2b59ff",
            borderWidth: 3,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#2b59ff",
            pointRadius: 5,
            tension: 0.35
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.08)" }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});
