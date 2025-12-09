//=========================================================
// CẬP NHẬT FILE search_results.js (Phía Khách Hàng)
// =========================================================

// Hàm hợp nhất dữ liệu gốc và dữ liệu Local Storage
function loadCustomCourts(originalCourts) {
    const storedCourts = localStorage.getItem('customCourts');
    if (!storedCourts) {
        return originalCourts;
    }
    
    try {
        const customCourts = JSON.parse(storedCourts);
        
        // Tránh trùng lặp ID (chỉ giữ lại các sân mới)
        const originalIds = originalCourts.map(c => c.id);
        const newCourts = customCourts.filter(c => !originalIds.includes(c.id));
        
        return originalCourts.concat(newCourts);
        
    } catch (e) {
        console.error("Lỗi khi tải Local Storage:", e);
        return originalCourts;
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const backBtn = document.getElementById('backToHome');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // 1. Lấy thông tin tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location') || ''; 
    const date = urlParams.get('date');
    const time = urlParams.get('time');

    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) {
        locationDisplay.textContent = location || 'Tất Cả Các Quận';
    }


    // 2. Dữ liệu các sân
    const allCourts = [
        // Hải Châu
        { id: 1, name: "Sân Hải Châu Premium A", type: "Thảm PVC", tickets: 10, open: "04:30", close: "22:00", image: "img/haichau1.png", district: "Hải Châu", price: "80.000", monthPrice: 600000 },
        { id: 2, name: "Sân Bồ Đề", type: "Thảm Su", tickets: 10, open: "05:00", close: "23:00", image: "img/haichau2.png", district: "Hải Châu", price: "80.000", monthPrice: 550000 },
        { id: 3, name: "Sân Nguyễn Văn Linh", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "21:00", image: "img/haichau3.png", district: "Hải Châu", price: "100.000", monthPrice: 750000 },
        { id: 4, name: "Sân 2/9 Club", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/haichau4.png", district: "Hải Châu", price: "80.000", monthPrice: 650000 },
        { id: 5, name: "Sân Đà Nẵng Centre", type: "Thảm Su", tickets: 10, open: "05:00", close: "22:30", image: "img/haichau5.png", district: "Hải Châu", price: "80.000", monthPrice: 620000 },

        // Thanh Khê
        { id: 6, name: "Sân Thanh Khê 1", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/thanhkhe1.png", district: "Thanh Khê", price: "80.000", monthPrice: 500000 },
        { id: 7, name: "Sân Thanh Khê 2", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/thanhkhe2.png", district: "Thanh Khê", price: "100.000", monthPrice: 700000 },
        { id: 8, name: "Sân Hà Huy Tập", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:30", image: "img/thanhkhe3.png", district: "Thanh Khê", price: "80.000", monthPrice: 550000 },
        { id: 9, name: "Sân Điện Biên Phủ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "22:30", image: "img/thanhkhe4.png", district: "Thanh Khê", price: "80.000", monthPrice: 600000 },
        { id: 10, name: "Sân Sỹ Quan", type: "Sàn Gỗ", tickets: 10, open: "06:30", close: "23:00", image: "img/thanhkhe5.png", district: "Thanh Khê", price: "100.000", monthPrice: 720000 },

        // Sơn Trà
        { id: 11, name: "Sân Sơn Trà Star", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/sontra1.png", district: "Sơn Trà", price: "100.000", monthPrice: 800000 },
        { id: 12, name: "Sân Hoàng Sa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/sontra2.png", district: "Sơn Trà", price: "80.000", monthPrice: 620000 },
        { id: 13, name: "Sân Mân Thái", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/sontra3.png", district: "Sơn Trà", price: "80.000", monthPrice: 600000 },
        { id: 14, name: "Sân Phạm Văn Đồng", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/sontra4.png", district: "Sơn Trà", price: "80.000", monthPrice: 650000 },
        { id: 15, name: "Sân Đông", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/sontra5.png", district: "Sơn Trà", price: "100.000", monthPrice: 750000 },

        // Liên Chiểu
        { id: 16, name: "Sân Bách Khoa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "23:00", image: "img/lienchieu1.png", district: "Liên Chiểu", price: "80.000", monthPrice: 500000 },
        { id: 17, name: "Sân Nguyễn Lương Bằng", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "22:00", image: "img/lienchieu2.png", district: "Liên Chiểu", price: "100.000", monthPrice: 700000 },
        { id: 18, name: "Sân Kinh Doanh", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/lienchieu6.png", district: "Liên Chiểu", price: "80.000", monthPrice: 550000 },
        { id: 19, name: "Sân Hòa Khánh", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:00", image: "img/lienchieu4.png", district: "Liên Chiểu", price: "80.000", monthPrice: 600000 },
        { id: 20, name: "Sân Đà Nẵng Tây", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/lienchieu7.png", district: "Liên Chiểu", price: "100.000", monthPrice: 720000 },

        // Cẩm Lệ
        { id: 21, name: "Sân Cẩm Lệ Mới", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/camle1.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 500000 },
        { id: 22, name: "Sân Tuyên Sơn", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/camle5.png", district: "Cẩm Lệ", price: "100.000", monthPrice: 720000 },
        { id: 23, name: "Sân Phan Đăng Lưu", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/camle6.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 550000 },
        { id: 24, name: "Sân Nguyễn Hữu Thọ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/camle2.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 600000 },
        { id: 25, name: "Sân Hòa Xuân", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/camle3.png", district: "Cẩm Lệ", price: "100.000", monthPrice: 750000 },
    ];

    // 3. Lọc sân
    const filteredCourts = allCourts.filter(court => {
        if (!location) return true; 
        return court.district.toLowerCase() === location.toLowerCase();
    });

    const container = document.getElementById('court-list-container');
    const noResults = document.getElementById('no-results-message');

    if (filteredCourts.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';

        filteredCourts.forEach(court => {
            const card = document.createElement('div');
            card.className = 'court-card';
            
            card.innerHTML = `
                <div class="court-img" style="background-image: url('${court.image}');"></div>
                <div class="court-info">
                    <h3 class="court-name">${court.name}</h3>
                    <p class="court-location">📍 ${court.district}</p>
                    <div class="court-details">
                        <span class="detail-item"> Loại Sân: <b>${court.type}</b></span>
                        <span class="detail-item"> Vé Còn: <b>${court.tickets}</b></span>
                    </div>
                    <p class="court-price">Giá: ${court.price} VNĐ/Giờ</p>
                    <p class="court-price">Giá: ${court.monthPrice} VNĐ/Tháng</p>
                    <p class="court-time">⏰ Mở: ${court.open} - Đóng: ${court.close}</p>
                    <button class="book-btn">Đặt Sân Ngay</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // ====== POPUP ======
    let currentCourt = null;
    let currentTickets = 1;
    let currentPrice = 0;
    let currentMonthPrice = 0;
    let totalAvailableTickets = 0;

    // ⭐⭐ TÍNH TIỀN (đã sửa theo giá tháng riêng)
    function calculateTotal() {
        const type = document.getElementById("ticketType").value;

        if (type === "month") {
            return (currentMonthPrice * currentTickets).toLocaleString('vi-VN');
        } else {
            return (currentPrice * currentTickets).toLocaleString('vi-VN');
        }
    }

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("book-btn")) {
            const card = e.target.closest(".court-card");
            const name = card.querySelector(".court-name").textContent;

            const courtData = allCourts.find(c => c.name === name);

            totalAvailableTickets = courtData.tickets;
            currentTickets = 1;

            currentPrice = parseInt(courtData.price.replace(/\./g, ''));
            currentMonthPrice = courtData.monthPrice;

            document.getElementById("courtTitle").textContent = name;
            document.getElementById("ticketCount").textContent = "1";
            document.getElementById("remainingTickets").textContent = totalAvailableTickets - 1;

            document.getElementById("bookingPopup").style.display = "flex";
        }
    });

    document.getElementById("closePopup").onclick = function () {
        document.getElementById("bookingPopup").style.display = "none";
    };

    document.getElementById("plusBtn").onclick = function () {
        if (currentTickets < totalAvailableTickets) { 
            currentTickets++;
            document.getElementById("ticketCount").textContent = currentTickets;
            document.getElementById("remainingTickets").textContent = totalAvailableTickets - currentTickets;
        }
    };

    document.getElementById("minusBtn").onclick = function () {
        if (currentTickets > 1) {
            currentTickets--;
            document.getElementById("ticketCount").textContent = currentTickets;
            document.getElementById("remainingTickets").textContent = totalAvailableTickets - currentTickets;
        }
    };

    document.getElementById("payNow").onclick = function () {
        const type = document.getElementById("ticketType").value;
        const sub = document.getElementById("subCourt").value;

        document.getElementById("pay_ticketType").textContent = type;
        document.getElementById("pay_subCourt").textContent = sub;
        document.getElementById("pay_ticketCount").textContent = currentTickets;
        document.getElementById("pay_totalAmount").textContent = calculateTotal() + " VNĐ";

        document.getElementById("paymentPopup").style.display = "flex";
    };

    document.getElementById("closePayment").onclick = function () {
        document.getElementById("paymentPopup").style.display = "none";
    };

});
