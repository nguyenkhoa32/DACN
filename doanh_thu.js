document.addEventListener('DOMContentLoaded', function() {

    const today = new Date().toISOString().slice(0,10);

    // ===== Hàm cập nhật doanh thu và biểu đồ =====
    function updateRevenue() {
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const views = Number(localStorage.getItem("views")) || 0;

        let doanhThuNgay = 0;
        let donNgay = 0;

        bookings.forEach(b=>{
            if(b.ngay === today){
                donNgay++;
                doanhThuNgay += Number(b.tien || 0);
            }
        });

        // Cập nhật 3 thẻ
        document.getElementById("doanhThuNgay").textContent = doanhThuNgay.toLocaleString() + " đ";
        document.getElementById("donNgay").textContent = donNgay + " đơn";
        document.getElementById("luotTruyCap").textContent = views + " lượt";

        // ===== Cập nhật biểu đồ 7 ngày =====
        const labels = [];
        const values = [];
        for(let i=6;i>=0;i--){
            let d = new Date();
            d.setDate(d.getDate()-i);
            let dateStr = d.toISOString().slice(0,10);
            labels.push(dateStr);

            let total = 0;
            bookings.forEach(b=>{
                if(b.ngay === dateStr) total += Number(b.tien || 0);
            });
            values.push(total);
        }

        const ctx = document.getElementById("revenueChart").getContext("2d");
        let gradient = ctx.createLinearGradient(0,0,0,350);
        gradient.addColorStop(0,"rgba(43,89,255,0.5)");
        gradient.addColorStop(1,"rgba(43,89,255,0)");

        if(window.revenueChartInstance) window.revenueChartInstance.destroy();

        window.revenueChartInstance = new Chart(ctx,{
            type:"line",
            data:{
                labels: labels,
                datasets:[{
                    label:"Doanh thu (VND)",
                    data: values,
                    fill:true,
                    backgroundColor: gradient,
                    borderColor:"#2b59ff",
                    borderWidth:3,
                    pointBackgroundColor:"#ffffff",
                    pointBorderColor:"#2b59ff",
                    pointRadius:5,
                    tension:0.35
                }]
            },
            options:{
                responsive:true,
                plugins:{legend:{display:false}},
                scales:{
                    y:{beginAtZero:true,grid:{color:"rgba(0,0,0,0.08)"}},
                    x:{grid:{display:false}}
                }
            }
        });
    }

    // ===== Lắng nghe khi có booking mới (storage event) =====
    window.addEventListener('storage', function(e){
        if(e.key === "bookings" || e.key === "views"){
            updateRevenue();
        }
    });

    // ===== Khởi tạo lần đầu =====
    updateRevenue();

    // ===== Optional: refresh nội bộ mỗi 5s =====
    setInterval(updateRevenue, 5000);

});
