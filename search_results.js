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

    // Cập nhật tiêu đề trang
    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) {
        locationDisplay.textContent = location || 'Tất Cả Các Quận';
    }


    // 2. Dữ liệu các sân
    const allCourts = [
        // --- SÂN QUẬN HẢI CHÂU (5 SÂN) ---
        { id: 1, name: "Sân Hải Châu Premium A", type: "Thảm PVC", tickets: 10, open: "04:30", close: "22:00", image: "img/haichau1.png", district: "Hải Châu", price: "80.000" },
        { id: 2, name: "Sân Bồ Đề", type: "Thảm Su", tickets: 10, open: "05:00", close: "23:00", image: "img/haichau2.png", district: "Hải Châu", price: "80.000" },
        { id: 3, name: "Sân Nguyễn Văn Linh", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "21:00", image: "img/haichau3.png", district: "Hải Châu", price: "100.000" },
        { id: 4, name: "Sân 2/9 Club", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/haichau4.png", district: "Hải Châu", price: "80.000" },
        { id: 5, name: "Sân Đà Nẵng Centre", type: "Thảm Su", tickets: 10, open: "05:00", close: "22:30", image: "img/haichau5.png", district: "Hải Châu", price: "80.000" },

        // --- SÂN QUẬN THANH KHÊ (5 SÂN) ---
        { id: 6, name: "Sân Thanh Khê 1", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/thanhkhe1.png", district: "Thanh Khê", price: "80.000" },
        { id: 7, name: "Sân Thanh Khê 2", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/thanhkhe2.png", district: "Thanh Khê", price: "100.000" },
        { id: 8, name: "Sân Hà Huy Tập", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:30", image: "img/thanhkhe3.png", district: "Thanh Khê", price: "80.000" },
        { id: 9, name: "Sân Điện Biên Phủ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "22:30", image: "img/thanhkhe4.png", district: "Thanh Khê", price: "80.000" },
        { id: 10, name: "Sân Sỹ Quan", type: "Sàn Gỗ", tickets: 10, open: "06:30", close: "23:00", image: "img/thanhkhe5.png", district: "Thanh Khê", price: "100.000" },

        // --- SÂN QUẬN SƠN TRÀ (5 SÂN) ---
        { id: 11, name: "Sân Sơn Trà Star", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/sontra1.png", district: "Sơn Trà", price: "100.000" },
        { id: 12, name: "Sân Hoàng Sa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/sontra2.png", district: "Sơn Trà", price: "80.000" },
        { id: 13, name: "Sân Mân Thái", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/sontra3.png", district: "Sơn Trà", price: "80.000" },
        { id: 14, name: "Sân Phạm Văn Đồng", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/sontra4.png", district: "Sơn Trà", price: "80.000" },
        { id: 15, name: "Sân Đông", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/sontra5.png", district: "Sơn Trà", price: "100.000" },
        
        // --- SÂN QUẬN LIÊN CHIỂU (5 SÂN) ---
        { id: 16, name: "Sân Bách Khoa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "23:00", image: "img/lienchieu1.png", district: "Liên Chiểu", price: "80.000" },
        { id: 17, name: "Sân Nguyễn Lương Bằng", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "22:00", image: "img/lienchieu2.png", district: "Liên Chiểu", price: "100.000" },
        { id: 18, name: "Sân Kinh Doanh", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/lienchieu6.png", district: "Liên Chiểu", price: "80.000" },
        { id: 19, name: "Sân Hòa Khánh", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:00", image: "img/lienchieu4.png", district: "Liên Chiểu", price: "80.000" },
        { id: 20, name: "Sân Đà Nẵng Tây", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/lienchieu7.png", district: "Liên Chiểu", price: "100.000" },
        
        // --- SÂN QUẬN CẨM LỆ (5 SÂN) ---
        { id: 21, name: "Sân Cẩm Lệ Mới", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/camle1.png", district: "Cẩm Lệ", price: "80.000" },
        { id: 22, name: "Sân Tuyên Sơn", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/camle5.png", district: "Cẩm Lệ", price: "100.000" },
        { id: 23, name: "Sân Phan Đăng Lưu", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/camle6.png", district: "Cẩm Lệ", price: "80.000" },
        { id: 24, name: "Sân Nguyễn Hữu Thọ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/camle2.png", district: "Cẩm Lệ", price: "80.000" },
        { id: 25, name: "Sân Hòa Xuân", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/camle3.png", district: "Cẩm Lệ", price: "100.000" },
    ];

    // 3. Lọc sân theo địa điểm tìm kiếm (Không thay đổi)
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
        
        // 4. Tạo và chèn thẻ sân vào container (Không thay đổi)
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
                    <p class="court-price">💵 Giá: <b>${court.price} VNĐ/Giờ</b></p> 
                    <p class="court-time">⏰ Mở: ${court.open} - Đóng: ${court.close}</p>
                    <button class="book-btn">Đặt Sân Ngay</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

// ====== POPUP ĐẶT SÂN VÀ THANH TOÁN (LOGIC TĂNG GIẢM VÉ ĐÃ SỬA LỖI NaN) ======
let currentCourt = null;
let currentTickets = 1;
let currentPrice = 0;
let totalAvailableTickets = 0; // Biến này lưu tổng vé


// Hàm tính tổng tiền và định dạng
function calculateTotal() {
    let total = currentTickets * currentPrice; 
    return total.toLocaleString('vi-VN'); 
}


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("book-btn")) {
        const card = e.target.closest(".court-card");
        const name = card.querySelector(".court-name").textContent;
        
        // SỬA LỖI: Tìm đối tượng sân trong mảng allCourts để lấy giá trị tickets an toàn.
        const courtData = allCourts.find(c => c.name === name);
        const tickets = courtData ? courtData.tickets : 0; 
        
        // Cập nhật biến tổng vé có sẵn
        totalAvailableTickets = tickets; 
        currentCourt = card;
        currentTickets = 1;

        // Lấy giá tiền và xử lý dấu chấm
        if (courtData && courtData.price) {
            currentPrice = parseInt(courtData.price.replace(/\./g, '')); 
        } else {
            currentPrice = 0;
        }

        document.getElementById("courtTitle").textContent = name;
        document.getElementById("ticketCount").textContent = "1";
        
        // LOGIC CHUẨN: Vé còn lại = Tổng vé (Số nguyên) - Vé đang chọn (1)
        document.getElementById("remainingTickets").textContent = totalAvailableTickets - currentTickets;
        
        document.getElementById("bookingPopup").style.display = "flex";
    }
});

// Đóng popup đặt sân
document.getElementById("closePopup").onclick = function () {
    document.getElementById("bookingPopup").style.display = "none";
};

// Nút + (TĂNG SỐ VÉ ĐẶT)
document.getElementById("plusBtn").onclick = function () {
    if (currentTickets < totalAvailableTickets) { 
        currentTickets++;
        document.getElementById("ticketCount").textContent = currentTickets;
        document.getElementById("remainingTickets").textContent = totalAvailableTickets - currentTickets;
        // Cập nhật tổng tiền ngay (Tùy chọn)
        // document.getElementById("pay_totalAmount").textContent = calculateTotal() + " VNĐ";
    }
};

// Nút – (GIẢM SỐ VÉ ĐẶT)
document.getElementById("minusBtn").onclick = function () {
    if (currentTickets > 1) {
        currentTickets--;
        document.getElementById("ticketCount").textContent = currentTickets;
        document.getElementById("remainingTickets").textContent = totalAvailableTickets - currentTickets;
        // Cập nhật tổng tiền ngay (Tùy chọn)
        // document.getElementById("pay_totalAmount").textContent = calculateTotal() + " VNĐ";
    }
};

// ====== CHUYỂN SANG THANH TOÁN ======

document.getElementById("payNow").onclick = function () {
    const type = document.getElementById("ticketType").value;
    const sub = document.getElementById("subCourt").value;
    
    // Tính toán tổng tiền
    const totalAmount = calculateTotal(); 

    // Gán giá trị vào Popup Thanh toán
    document.getElementById("pay_ticketType").textContent = type;
    document.getElementById("pay_subCourt").textContent = sub;
    document.getElementById("pay_ticketCount").textContent = currentTickets;
    
    // Gán Tổng tiền (Chắc chắn ID đã tồn tại trong HTML)
    document.getElementById("pay_totalAmount").textContent = totalAmount + " VNĐ";

    document.getElementById("paymentPopup").style.display = "flex";
};

// Đóng popup thanh toán
document.getElementById("closePayment").onclick = function () {
    document.getElementById("paymentPopup").style.display = "none";
};

});