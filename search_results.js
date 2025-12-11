// =========================================================
// CẬP NHẬT FILE search_results.js - ĐÃ SỬA LỖI ĐỒNG BỘ DỮ LIỆU VÀ LỖI getPrice
// Key thống nhất: 'appCourtsData'
// =========================================================
// ==================== HÀM GHI DOANH THU KHI THANH TOÁN ====================
window.customerBooking = function(amount) {

    // Lấy danh sách booking (đã lưu theo chuẩn của bạn)
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Tạo booking ảo chỉ để trang doanh thu đọc realtime
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const log = {
        ngay: todayStr,
        thang: today.getMonth() + 1,
        nam: today.getFullYear(),
        tien: Number(amount) || 0
    };

    // Lưu vào localStorage để trang doanh thu đọc lên
    let revenueLog = JSON.parse(localStorage.getItem("revenueLog")) || [];
    revenueLog.push(log);
    localStorage.setItem("revenueLog", JSON.stringify(revenueLog));
};

// 1. DỮ LIỆU CÁC SÂN GỐC (Dùng làm FALLBACK)
const COURTS_DATA = [
    // Hải Châu
    { id: 1, name: "Sân Hải Châu Premium A", type: "Thảm PVC", tickets: 10, open: "04:30", close: "22:00", image: "img/haichau1.png", district: "Hải Châu", price: "80.000", monthPrice: 600000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 2, name: "Sân Bồ Đề", type: "Thảm Su", tickets: 10, open: "05:00", close: "23:00", image: "img/haichau2.png", district: "Hải Châu", price: "80.000", monthPrice: 550000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 3, name: "Sân Nguyễn Văn Linh", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "21:00", image: "img/haichau3.png", district: "Hải Châu", price: "100.000", monthPrice: 750000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 4, name: "Sân 2/9 Club", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/haichau4.png", district: "Hải Châu", price: "80.000", monthPrice: 650000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 5, name: "Sân Đà Nẵng Centre", type: "Thảm Su", tickets: 10, open: "05:00", close: "22:30", image: "img/haichau5.png", district: "Hải Châu", price: "80.000", monthPrice: 620000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    // Thanh Khê
    { id: 6, name: "Sân Thanh Khê 1", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/thanhkhe1.png", district: "Thanh Khê", price: "80.000", monthPrice: 500000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 7, name: "Sân Thanh Khê 2", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/thanhkhe2.png", district: "Thanh Khê", price: "100.000", monthPrice: 700000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 8, name: "Sân Hà Huy Tập", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:30", image: "img/thanhkhe3.png", district: "Thanh Khê", price: "80.000", monthPrice: 550000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 9, name: "Sân Điện Biên Phủ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "22:30", image: "img/thanhkhe4.png", district: "Thanh Khê", price: "80.000", monthPrice: 600000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 10, name: "Sân Sỹ Quan", type: "Sàn Gỗ", tickets: 10, open: "06:30", close: "23:00", image: "img/thanhkhe5.png", district: "Thanh Khê", price: "100.000", monthPrice: 720000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    // Sơn Trà
    { id: 11, name: "Sân Sơn Trà Star", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/sontra1.png", district: "Sơn Trà", price: "100.000", monthPrice: 800000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 12, name: "Sân Hoàng Sa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/sontra2.png", district: "Sơn Trà", price: "80.000", monthPrice: 620000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 13, name: "Sân Mân Thái", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/sontra3.png", district: "Sơn Trà", price: "80.000", monthPrice: 600000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 14, name: "Sân Phạm Văn Đồng", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/sontra4.png", district: "Sơn Trà", price: "80.000", monthPrice: 650000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 15, name: "Sân Đông", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/sontra5.png", district: "Sơn Trà", price: "100.000", monthPrice: 750000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    // Liên Chiểu
    { id: 16, name: "Sân Bách Khoa", type: "Thảm PVC", tickets: 10, open: "05:00", close: "23:00", image: "img/lienchieu1.png", district: "Liên Chiểu", price: "80.000", monthPrice: 500000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 17, name: "Sân Nguyễn Lương Bằng", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "22:00", image: "img/lienchieu2.png", district: "Liên Chiểu", price: "100.000", monthPrice: 700000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 18, name: "Sân Kinh Doanh", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/lienchieu6.png", district: "Liên Chiểu", price: "80.000", monthPrice: 550000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 19, name: "Sân Hòa Khánh", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:00", image: "img/lienchieu4.png", district: "Liên Chiểu", price: "80.000", monthPrice: 600000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 20, name: "Sân Đà Nẵng Tây", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/lienchieu7.png", district: "Liên Chiểu", price: "100.000", monthPrice: 720000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    // Cẩm Lệ
    { id: 21, name: "Sân Cẩm Lệ Mới", type: "Thảm PVC", tickets: 10, open: "05:00", close: "22:00", image: "img/camle1.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 500000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 22, name: "Sân Tuyên Sơn", type: "Sàn Gỗ", tickets: 10, open: "06:00", close: "23:00", image: "img/camle5.png", district: "Cẩm Lệ", price: "100.000", monthPrice: 720000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 23, name: "Sân Phan Đăng Lưu", type: "Thảm Su", tickets: 10, open: "04:30", close: "21:00", image: "img/camle6.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 550000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 24, name: "Sân Nguyễn Hữu Thọ", type: "Thảm PVC", tickets: 10, open: "05:30", close: "23:30", image: "img/camle2.png", district: "Cẩm Lệ", price: "80.000", monthPrice: 600000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
    { id: 25, name: "Sân Hòa Xuân", type: "Sàn Gỗ", tickets: 10, open: "05:00", close: "22:30", image: "img/camle3.png", district: "Cẩm Lệ", price: "100.000", monthPrice: 750000, subCourts: [{ id: 1, tickets: 10 }, { id: 2, tickets: 10 }, { id: 3, tickets: 10 }, { id: 4, tickets: 10 }, { id: 5, tickets: 10 }] },
];


// 2. HÀM HỖ TRỢ LOCAL STORAGE (BOOKING)
function getBookingsData() {
    const storedBookings = localStorage.getItem('bookings');
    return storedBookings ? JSON.parse(storedBookings) : [];
}
function saveBookingsData(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// 3. HÀM HỖ TRỢ LOCAL STORAGE (COURT DATA)
const COURTS_STORAGE_KEY = 'appCourtsData';
function saveCourtsData(courts) {
    localStorage.setItem(COURTS_STORAGE_KEY, JSON.stringify(courts));
}
function loadAndSyncCourtsData(originalCourts) {
    const storedCourtsJson = localStorage.getItem(COURTS_STORAGE_KEY);
    let currentCourts = originalCourts;
    if (storedCourtsJson) {
        try {
            const storedCourts = JSON.parse(storedCourtsJson);
            if (Array.isArray(storedCourts) && storedCourts.length > 0) {
                currentCourts = storedCourts;
            }
        } catch (e) {
            console.error("Lỗi khi tải Local Storage, sử dụng dữ liệu gốc:", e);
        }
    }
    saveCourtsData(currentCourts);
    return currentCourts;
}

// --- DOMContentLoaded START ---
document.addEventListener('DOMContentLoaded', function() {

    // LẤY DỮ LIỆU SÂN ĐÃ ĐỒNG BỘ
    let allCourts = loadAndSyncCourtsData(COURTS_DATA);

    // Nút quay về trang chủ
    const backBtn = document.getElementById('backToHome');
    if (backBtn) backBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

    // Lấy thông tin tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const filterLocation = urlParams.get('location') || '';
    const filterDate = urlParams.get('date') || 'N/A';
    const filterTime = urlParams.get('time') || 'N/A';
    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) locationDisplay.textContent = filterLocation || 'Tất Cả Các Quận';

    // POPUP VARS
    let currentCourt = null;
    let currentTickets = 1;

    const paymentPopup = document.getElementById("paymentPopup");
    const bookingPopup = document.getElementById("bookingPopup");
    const confirmBtn = document.getElementById("confirmPayment");
    const transferInput = document.getElementById("transferFile");
    const fileNameDisplay = document.getElementById("fileName");

    // HÀM TÍNH GIÁ AN TOÀN
    function getPrice() {
        if (!currentCourt) return 0;
        const typeEl = document.getElementById("ticketType");
        const type = typeEl ? typeEl.value : 'hour';
        const priceHourString = currentCourt.price ? String(currentCourt.price).replace(/\./g, '') : '0';
        const priceHour = parseInt(priceHourString) || 0;
        let finalPrice = 0;
        if (type === "month") {
            finalPrice = Number(currentCourt.monthPrice || 0);
        } else {
            finalPrice = priceHour * currentTickets;
        }
        return finalPrice;
    }

    // RENDER COURT CARDS
    function renderCourtCards() {
        allCourts = loadAndSyncCourtsData(COURTS_DATA);
        const filteredCourtsRender = allCourts.filter(court => {
            if (!filterLocation) return true;
            return court.district.toLowerCase() === filterLocation.toLowerCase();
        });

        const container = document.getElementById('court-list-container');
        const noResults = document.getElementById('no-results-message');
        if (!container || !noResults) return;

        container.innerHTML = '';
        if (filteredCourtsRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        filteredCourtsRender.forEach(court => {
            const card = document.createElement('div');
            card.className = 'court-card';
            const currentTicketsCount = allCourts.find(c => c.id === court.id)?.tickets ?? court.tickets;
            const monthPriceDisplay = (court.monthPrice || 0).toLocaleString('vi-VN');

            card.innerHTML = `
                <div class="court-img" style="background-image: url('${court.image}');"></div>
                <div class="court-info">
                    <h3 class="court-name">${court.name}</h3>
                    <p class="court-location">📍 ${court.district}</p>
                    <div class="court-details">
                        <span class="detail-item"> Loại Sân: <b>${court.type}</b></span>
                        <span class="detail-item"> Vé Còn: <b>${currentTicketsCount}</b></span>
                    </div>
                    <p class="court-price">Giá: ${court.price} VNĐ/Giờ</p>
                    <p class="court-price">Giá: ${monthPriceDisplay} VNĐ/Tháng</p>
                    <p class="court-time">⏰ Mở: ${court.open} - Đóng: ${court.close}</p>
                    <button class="book-btn">Đặt Sân Ngay</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Listener cho các nút Đặt Sân Ngay
        document.querySelectorAll(".book-btn").forEach(button => {
            button.addEventListener("click", e => {
                const card = e.target.closest(".court-card");
                const name = card.querySelector(".court-name").textContent;
                currentCourt = allCourts.find(c => c.name === name);

                if (!currentCourt) {
                    alert("Lỗi dữ liệu: Không tìm thấy thông tin chi tiết của sân này.");
                    return;
                }
                if (currentCourt.tickets <= 0) {
                    alert("Rất tiếc, sân này đã hết vé. Vui lòng chọn sân khác!");
                    return;
                }

                currentTickets = 1;
                const courtTitle = document.getElementById("courtTitle");
                const ticketCountDisplay = document.getElementById("ticketCount");
                const remainingTicketsDisplay = document.getElementById("remainingTickets");

                if (courtTitle) courtTitle.textContent = name;
                if (ticketCountDisplay) ticketCountDisplay.textContent = "1";
                if (remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - 1;
                if (bookingPopup) bookingPopup.style.display = "flex";

                // Cập nhật dropdown subCourt nếu cần (nếu bạn có)
                const subCourtSelect = document.getElementById("subCourt");
                if (subCourtSelect && currentCourt.subCourts && currentCourt.subCourts.length > 0) {
                    subCourtSelect.innerHTML = '';
                    currentCourt.subCourts.forEach(sc => {
                        const opt = document.createElement('option');
                        opt.value = sc.id;
                        opt.textContent = `Sân ${sc.id}`;
                        subCourtSelect.appendChild(opt);
                    });
                }

                document.getElementById("ticketType")?.dispatchEvent(new Event('change'));
            });
        });
    }

    // --- POPUP EVENTS ---

    // Đóng popup booking
    const closePopupBtn = document.getElementById("closePopup");
    if (closePopupBtn) closePopupBtn.addEventListener("click", () => { if (bookingPopup) bookingPopup.style.display = "none"; });

    // Nút tăng/giảm vé
    const plusBtn = document.getElementById("plusBtn");
    const minusBtn = document.getElementById("minusBtn");
    const ticketCountDisplay = document.getElementById("ticketCount");
    const remainingTicketsDisplay = document.getElementById("remainingTickets");

    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            if (!currentCourt) return;
            if (currentTickets < currentCourt.tickets) {
                currentTickets++;
                if (ticketCountDisplay) ticketCountDisplay.textContent = currentTickets;
                if (remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - currentTickets;
            }
        });
    }
    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            if (currentTickets > 1) {
                currentTickets--;
                if (ticketCountDisplay) ticketCountDisplay.textContent = currentTickets;
                if (remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - currentTickets;
            }
        });
    }

    // Chuyển sang Thanh toán
    const payNowBtn = document.getElementById("payNow");
    if (payNowBtn) {
        payNowBtn.addEventListener("click", () => {
            if (!currentCourt) return;
            if (filterDate === 'N/A' || filterTime === 'N/A') {
                alert("Vui lòng chọn Ngày và Giờ đặt sân trước khi thanh toán.");
                return;
            }

            const ticketTypeEl = document.getElementById("ticketType");
            const ticketTypeValue = ticketTypeEl ? ticketTypeEl.value : 'hour';
            const subCourtEl = document.getElementById("subCourt");

            const pay_ticketType = document.getElementById("pay_ticketType");
            const pay_subCourt = document.getElementById("pay_subCourt");
            const pay_ticketCount = document.getElementById("pay_ticketCount");
            const pay_totalAmount = document.getElementById("pay_totalAmount");

            if (pay_ticketType) pay_ticketType.textContent = ticketTypeValue === 'month' ? 'Vé Tháng' : 'Vé Giờ';
            if (pay_subCourt) pay_subCourt.textContent = subCourtEl ? subCourtEl.value : 'N/A';
            if (pay_ticketCount) pay_ticketCount.textContent = ticketTypeValue === 'month' ? '1 (Tháng)' : currentTickets;

            if (pay_totalAmount) pay_totalAmount.textContent = getPrice().toLocaleString('vi-VN') + " VNĐ";

            if (paymentPopup) paymentPopup.style.display = "flex";
            const qrBox = document.getElementById("qrBox");
            const transferBox = document.getElementById("transferBox");
            const paymentMethodCash = document.querySelector("input[name='paymentMethod'][value='cash']");
            if (paymentMethodCash) paymentMethodCash.checked = true;
            if (qrBox) qrBox.style.display = "none";
            if (transferBox) transferBox.style.display = "none";
            if (confirmBtn) confirmBtn.disabled = false;
        });
    }

    // Đóng thanh toán
    const closePaymentBtn = document.getElementById("closePayment");
    if (closePaymentBtn) closePaymentBtn.addEventListener("click", () => { if (paymentPopup) paymentPopup.style.display = "none"; });

    // Xử lý phương thức thanh toán (QR/Tiền mặt)
    document.querySelectorAll("input[name='paymentMethod']").forEach(radio => {
        radio.addEventListener("change", function() {
            const qrBox = document.getElementById("qrBox");
            const transferBox = document.getElementById("transferBox");
            if (this.value === "qr") {
                if (qrBox) qrBox.style.display = "block";
                if (transferBox) transferBox.style.display = "block";
                if (confirmBtn) confirmBtn.disabled = true;
            } else {
                if (qrBox) qrBox.style.display = "none";
                if (transferBox) transferBox.style.display = "none";
                if (confirmBtn) confirmBtn.disabled = false;
            }
        });
    });

    // Xử lý upload file chuyển khoản
    if (transferInput) {
        transferInput.addEventListener("change", function() {
            if (this.files.length > 0) {
                if (fileNameDisplay) fileNameDisplay.textContent = this.files[0].name;
                if (document.querySelector("input[name='paymentMethod']:checked")?.value === "qr") {
                    if (confirmBtn) confirmBtn.disabled = false;
                }
            } else {
                if (fileNameDisplay) fileNameDisplay.textContent = "Chưa chọn file";
                if (document.querySelector("input[name='paymentMethod']:checked")?.value === "qr") {
                    if (confirmBtn) confirmBtn.disabled = true;
                }
            }
        });
    }

    // Xử lý Xác nhận Thanh toán (lưu booking và cập nhật vé)
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const paymentMethod = document.querySelector("input[name='paymentMethod']:checked")?.value;
            const ticketType = document.getElementById("ticketType")?.value || 'hour';

            if (filterDate === 'N/A' || filterTime === 'N/A') {
                alert("Lỗi hệ thống: Ngày hoặc Giờ đặt sân không được tìm thấy.");
                return;
            }
            if (paymentMethod === "qr" && transferInput && transferInput.files.length === 0) {
                alert("Vui lòng tải ảnh chuyển khoản trước khi xác nhận.");
                return;
            }

            const ticketsToDeduct = ticketType === 'month' ? 1 : currentTickets;

            const newBooking = {
                id: Date.now(),
                ngay: filterDate,
                gio: filterTime,
                tenSan: currentCourt.name,
                soSan: document.getElementById("subCourt") ? document.getElementById("subCourt").value : 'N/A',
                soVe: ticketsToDeduct,
                thanhToan: getPrice().toLocaleString('vi-VN') + " VNĐ",
                loaiVe: ticketType === 'month' ? 'Vé Tháng' : 'Vé Giờ',
                paymentMethod: paymentMethod === 'qr' ? 'QR Code' : 'Tiền mặt',
                userId: localStorage.getItem('currentUserEmail') || 'guest'
            };

            // Lưu lịch sử đặt sân
            let bookings = getBookingsData();
            bookings.push(newBooking);
            saveBookingsData(bookings);

            // Cập nhật số vé còn lại trên allCourts và localStorage
            const courtIndex = allCourts.findIndex(c => c.id === currentCourt.id);
            if (courtIndex !== -1) {
                allCourts[courtIndex].tickets -= ticketsToDeduct;
                if (allCourts[courtIndex].tickets < 0) allCourts[courtIndex].tickets = 0;
                saveCourtsData(allCourts);
            }

            alert(`Đặt sân "${newBooking.tenSan}" thành công!\nTổng tiền: ${newBooking.thanhToan}`);

            if (paymentPopup) paymentPopup.style.display = "none";
            if (bookingPopup) bookingPopup.style.display = "none";

            // Render lại để hiển thị vé còn
            renderCourtCards();

            // Nếu bạn có hàm dashboard để cập nhật doanh thu, gọi ở đây:
            if (window.customerBooking) {
                window.customerBooking(Number(getPrice()));
            }
        });
    }

    // Dropdown loại vé: ẩn/hiện bộ đếm và cập nhật remaining tickets
    const ticketTypeSelect = document.getElementById("ticketType");
    if (ticketTypeSelect) {
        // tìm parent element chứa remainingTickets (an toàn hơn dùng :has)
        const remainingTicketsEl = document.getElementById("remainingTickets");
        const remainingTicketsParent = remainingTicketsEl ? remainingTicketsEl.closest('p') : null;
        const ticketCounter = document.querySelector('.ticket-counter');

        ticketTypeSelect.addEventListener('change', () => {
            const isMonthTicket = ticketTypeSelect.value === 'month';
            if (isMonthTicket) {
                currentTickets = 1;
                if (ticketCountDisplay) ticketCountDisplay.textContent = "1";
                if (ticketCounter) ticketCounter.style.display = 'none';
                if (remainingTicketsEl) remainingTicketsEl.textContent = 'N/A';
                if (remainingTicketsParent) remainingTicketsParent.style.display = 'none';
            } else {
                if (ticketCounter) ticketCounter.style.display = 'block';
                if (remainingTicketsParent) remainingTicketsParent.style.display = 'block';
                if (currentCourt && remainingTicketsEl) {
                    remainingTicketsEl.textContent = currentCourt.tickets - currentTickets;
                }
            }
        });
        ticketTypeSelect.dispatchEvent(new Event('change'));
    }

    // Khởi chạy
    renderCourtCards();
});
// --- DOMContentLoaded END ---