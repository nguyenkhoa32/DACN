// Lượt truy cập khách hàng (đếm số lần vào trang tìm sân / đặt sân)
let luotTruyCap = Number(localStorage.getItem("views")) || 0;

document.getElementById("luotTruyCap").textContent = luotTruyCap + " lượt";
