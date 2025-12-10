// =========================================================
// CẬP NHẬT FILE search_results.js - ĐÃ SỬA LỖI ĐỒNG BỘ DỮ LIỆU VÀ LỖI getPrice
// Key thống nhất: 'appCourtsData'
// =========================================================

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


// 3. HÀM HỖ TRỢ LOCAL STORAGE (COURT DATA - ĐÃ SỬA LỖI TẢI DỮ LIỆU)
const COURTS_STORAGE_KEY = 'appCourtsData'; 

function saveCourtsData(courts) {
    // SỬ DỤNG KEY ĐÃ ĐỒNG BỘ: 'appCourtsData'
    localStorage.setItem(COURTS_STORAGE_KEY, JSON.stringify(courts));
}

function loadAndSyncCourtsData(originalCourts) {
    const storedCourtsJson = localStorage.getItem(COURTS_STORAGE_KEY);
    let currentCourts = originalCourts; 

    if (storedCourtsJson) {
        try {
            const storedCourts = JSON.parse(storedCourtsJson);
            
            // ƯU TIÊN DỮ LIỆU TỪ LOCAL STORAGE (bao gồm sân mới từ Admin)
            if (Array.isArray(storedCourts) && storedCourts.length > 0) {
                 currentCourts = storedCourts; 
            }
        } catch (e) {
            console.error("Lỗi khi tải Local Storage, sử dụng dữ liệu gốc:", e);
        }
    }
    
    // Đảm bảo dữ liệu cuối cùng (bao gồm cả sân mới của Admin) được lưu lại
    // để đồng bộ hóa cho Admin nếu họ vừa mới khởi tạo.
    saveCourtsData(currentCourts); 
    
    return currentCourts; 
}


// --- DOMContentLoaded START ---
document.addEventListener('DOMContentLoaded', function() {
    
    // LẤY DỮ LIỆU SÂN ĐÃ ĐƯỢC ĐỒNG BỘ/CẬP NHẬT
    let allCourts = loadAndSyncCourtsData(COURTS_DATA);

    // Nút quay về trang chủ
    const backBtn = document.getElementById('backToHome');
    if(backBtn) backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Lấy thông tin tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const filterLocation = urlParams.get('location') || '';
    const filterDate = urlParams.get('date') || 'N/A'; // Lấy ngày (mặc định N/A)
    const filterTime = urlParams.get('time') || 'N/A'; // Lấy giờ (mặc định N/A)

    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) locationDisplay.textContent = filterLocation || 'Tất Cả Các Quận';


    // ======= POPUP BIẾN VÀ HÀM =======
    let currentCourt = null;
    let currentTickets = 1;
    
    const paymentPopup = document.getElementById("paymentPopup");
    const bookingPopup = document.getElementById("bookingPopup");
    const confirmBtn = document.getElementById("confirmPayment");
    const transferInput = document.getElementById("transferFile");
    const fileNameDisplay = document.getElementById("fileName");

    // HÀM TÍNH GIÁ ĐÃ ĐƯỢC SỬA LỖI AN TOÀN (FIXED)
    function getPrice() {
        if (!currentCourt) return 0;
        
        const type = document.getElementById("ticketType").value;
        
        // Loại bỏ dấu chấm (.) trong giá tiền rồi chuyển sang số. Dùng 0 nếu bị lỗi parse.
        const priceHourString = currentCourt.price ? currentCourt.price.replace(/\./g,'') : '0';
        // Đảm bảo giá giờ luôn là số (hoặc 0)
        const priceHour = parseInt(priceHourString) || 0; 
        
        let finalPrice = 0;

        if(type === "month") {
             // Giá tháng: Đảm bảo monthPrice là số và dùng 0 nếu nó là undefined/null
             finalPrice = currentCourt.monthPrice || 0; 
        } else {
             // Vé giờ: Giá/giờ * số vé
             finalPrice = priceHour * currentTickets;
        }
        
        // Đảm bảo giá trị trả về luôn là số
        return finalPrice;
    }
    
    function renderCourtCards() {
        // Luôn tải lại dữ liệu mới nhất từ Local Storage trước khi render
        allCourts = loadAndSyncCourtsData(COURTS_DATA); 
        
        // Lọc lại danh sách theo dữ liệu mới nhất (bao gồm sân mới)
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
            
            // Tìm số lượng vé còn lại hiện tại từ allCourts đã load
            const currentTicketsCount = allCourts.find(c => c.id === court.id)?.tickets || court.tickets;

            // Xử lý giá tháng an toàn
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

        // Thêm listener cho các nút Đặt Sân Ngay
        document.querySelectorAll(".book-btn").forEach(button => {
            button.addEventListener("click", e => {
                const card = e.target.closest(".court-card");
                const name = card.querySelector(".court-name").textContent;
                
                // Cần tìm trong danh sách ALLCOURTS đã được cập nhật
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
                
                if(courtTitle) courtTitle.textContent = name;
                if(ticketCountDisplay) ticketCountDisplay.textContent = "1";
                // Vé còn lại = Tổng vé - Vé đang đặt (1)
                if(remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - 1; 
                
                if(bookingPopup) bookingPopup.style.display = "flex";
                
                // Gọi lại logic cập nhật loại vé để đảm bảo hiển thị đúng giá/số vé ngay lập tức
                document.getElementById("ticketType")?.dispatchEvent(new Event('change'));
            });
        });
    }


    // --- XỬ LÝ SỰ KIỆN POPUP ---

    // 1. Nút Đóng Popup
    const closePopupBtn = document.getElementById("closePopup");
    if(closePopupBtn) {
        closePopupBtn.addEventListener("click", () => {
            if(bookingPopup) bookingPopup.style.display = "none";
        });
    }

    // 2. Nút Tăng/Giảm Số Lượng Vé
    const plusBtn = document.getElementById("plusBtn");
    const minusBtn = document.getElementById("minusBtn");
    const ticketCountDisplay = document.getElementById("ticketCount");
    const remainingTicketsDisplay = document.getElementById("remainingTickets");

    if(plusBtn) {
        plusBtn.addEventListener("click", () => {
            if(!currentCourt) return;
            if(currentTickets < currentCourt.tickets) {
                currentTickets++;
                if(ticketCountDisplay) ticketCountDisplay.textContent = currentTickets;
                if(remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - currentTickets;
            }
        });
    }
    
    if(minusBtn) {
        minusBtn.addEventListener("click", () => {
            if(currentTickets > 1) {
                currentTickets--;
                if(ticketCountDisplay) ticketCountDisplay.textContent = currentTickets;
                if(remainingTicketsDisplay) remainingTicketsDisplay.textContent = currentCourt.tickets - currentTickets;
            }
        });
    }


    // 3. Nút Chuyển sang Thanh toán (payNow)
    const payNowBtn = document.getElementById("payNow");
    if(payNowBtn) {
        payNowBtn.addEventListener("click", () => {
            if (!currentCourt) return;
            
            // Kiểm tra Ngày và Giờ có được truyền từ trang Index không (Fix lỗi 3 trước đó)
            if (filterDate === 'N/A' || filterTime === 'N/A') {
                alert("Vui lòng chọn Ngày và Giờ đặt sân trước khi thanh toán.");
                return;
            }


            // Hiển thị thông tin thanh toán
            document.getElementById("pay_ticketType").textContent = document.getElementById("ticketType").value === 'month' ? 'Vé Tháng' : 'Vé Giờ';
            document.getElementById("pay_subCourt").textContent = document.getElementById("subCourt").value;
            document.getElementById("pay_ticketCount").textContent = document.getElementById("ticketType").value === 'month' ? '1 (Tháng)' : currentTickets;
            
            // Dòng 177: Sử dụng getPrice() đã được sửa lỗi an toàn
            document.getElementById("pay_totalAmount").textContent = getPrice().toLocaleString('vi-VN') + " VNĐ";

            // Reset trạng thái thanh toán
            if(paymentPopup) paymentPopup.style.display = "flex";
            const qrBox = document.getElementById("qrBox");
            const transferBox = document.getElementById("transferBox");
            const paymentMethodCash = document.querySelector("input[name='paymentMethod'][value='cash']");
            
            if(paymentMethodCash) paymentMethodCash.checked = true; // Chọn lại thanh toán tiền mặt mặc định

            if(qrBox) qrBox.style.display = "none";
            if(transferBox) transferBox.style.display = "none";
            if(confirmBtn) confirmBtn.disabled = false;
        });
    }

    // 4. Nút Đóng Thanh toán
    const closePaymentBtn = document.getElementById("closePayment");
    if(closePaymentBtn) {
        closePaymentBtn.addEventListener("click", () => {
            if(paymentPopup) paymentPopup.style.display = "none";
        });
    }

    // 5. Xử lý Phương thức thanh toán (QR/Tiền mặt)
    document.querySelectorAll("input[name='paymentMethod']").forEach(radio => {
        radio.addEventListener("change", function() {
            const qrBox = document.getElementById("qrBox");
            const transferBox = document.getElementById("transferBox");

            if(this.value === "qr") {
                if(qrBox) qrBox.style.display = "block";
                if(transferBox) transferBox.style.display = "block";
                if(confirmBtn) confirmBtn.disabled = true; // Yêu cầu tải file
            } else {
                if(qrBox) qrBox.style.display = "none";
                if(transferBox) transferBox.style.display = "none";
                if(confirmBtn) confirmBtn.disabled = false; // Thanh toán tiền mặt -> xác nhận ngay
            }
        });
    });

    // 6. Xử lý Tải file chuyển khoản
    if (transferInput) {
        transferInput.addEventListener("change", function() {
            if(this.files.length > 0) {
                if(fileNameDisplay) fileNameDisplay.textContent = this.files[0].name;
                // Nếu đang chọn QR, bật nút xác nhận khi có file
                if(document.querySelector("input[name='paymentMethod']:checked")?.value === "qr") {
                    if(confirmBtn) confirmBtn.disabled = false; 
                }
            } else {
                if(fileNameDisplay) fileNameDisplay.textContent = "Chưa chọn file";
                if(document.querySelector("input[name='paymentMethod']:checked")?.value === "qr") {
                    if(confirmBtn) confirmBtn.disabled = true; 
                }
            }
        });
    }

    // 7. Xử lý Xác nhận Thanh toán (LƯU LỊCH SỬ BOOKING VÀ CẬP NHẬT SỐ VÉ)
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const paymentMethod = document.querySelector("input[name='paymentMethod']:checked")?.value;
            const ticketType = document.getElementById("ticketType").value;
            
            // Kiểm tra Ngày và Giờ (lặp lại kiểm tra an toàn)
            if (filterDate === 'N/A' || filterTime === 'N/A') {
                alert("Lỗi hệ thống: Ngày hoặc Giờ đặt sân không được tìm thấy.");
                return;
            }

            // Kiểm tra file chuyển khoản (nếu là QR)
            if(paymentMethod === "qr" && transferInput.files.length === 0) {
                alert("Vui lòng tải ảnh chuyển khoản trước khi xác nhận.");
                return;
            }
            
            // Số lượng vé cần trừ: 1 nếu là vé tháng, currentTickets nếu là vé giờ
            const ticketsToDeduct = ticketType === 'month' ? 1 : currentTickets;
            
            // TẠO LỊCH SỬ ĐẶT SÂN
            const newBooking = {
                id: Date.now(),
                ngay: filterDate,
                gio: filterTime,
                tenSan: currentCourt.name,
                soSan: document.getElementById("subCourt").value,
                soVe: ticketsToDeduct,
                thanhToan: getPrice().toLocaleString('vi-VN') + " VNĐ",
                loaiVe: ticketType === 'month' ? 'Vé Tháng' : 'Vé Giờ',
                paymentMethod: paymentMethod === 'qr' ? 'QR Code' : 'Tiền mặt',
                userId: localStorage.getItem('currentUserEmail') || 'guest'
            };

            // LƯU LỊCH SỬ ĐẶT SÂN VÀO LOCAL STORAGE
            let bookings = getBookingsData();
            bookings.push(newBooking);
            saveBookingsData(bookings); 

            // CẬP NHẬT SỐ LƯỢNG VÉ CÒN LẠI CỦA SÂN TRONG LOCAL STORAGE
            const courtIndex = allCourts.findIndex(c => c.id === currentCourt.id);
            if (courtIndex !== -1) {
                allCourts[courtIndex].tickets -= ticketsToDeduct;
                saveCourtsData(allCourts); // Lưu dữ liệu sân đã cập nhật (key đã đồng bộ)
            }
            
            alert(`Đặt sân "${newBooking.tenSan}" thành công!\nTổng tiền: ${newBooking.thanhToan}`);

            if(paymentPopup) paymentPopup.style.display = "none";
            if(bookingPopup) document.getElementById("bookingPopup").style.display = "none";
            
            // Render lại kết quả để hiển thị số vé còn lại đã cập nhật
            renderCourtCards(); 
        });
    }

    // --- KHỞI CHẠY CHỨC NĂNG ---
    renderCourtCards();
    
    // Thêm listener cho dropdown loại vé để cập nhật giá tiền/số vé
    const ticketTypeSelect = document.getElementById("ticketType");
    if (ticketTypeSelect) {
        ticketTypeSelect.addEventListener('change', () => {
            // Khi chuyển sang vé tháng, số vé đặt luôn là 1 và ẩn bộ đếm
            const isMonthTicket = ticketTypeSelect.value === 'month';
            const ticketCounter = document.querySelector('.ticket-counter');
            
            if (isMonthTicket) {
                // Đặt lại số lượng vé về 1 và ẩn bộ đếm
                currentTickets = 1;
                document.getElementById("ticketCount").textContent = "1";
                if(ticketCounter) ticketCounter.style.display = 'none';
                
                // Vé còn lại chỉ có ý nghĩa với vé giờ, nên có thể tạm ẩn hoặc hiển thị "N/A"
                document.getElementById("remainingTickets").textContent = 'N/A';
                document.querySelector('p:has(#remainingTickets)').style.display = 'none';
                
            } else {
                // Vé giờ, hiện bộ đếm
                if(ticketCounter) ticketCounter.style.display = 'block';
                document.querySelector('p:has(#remainingTickets)').style.display = 'block';

                // Cập nhật lại số vé còn lại theo vé giờ
                if (currentCourt) {
                    document.getElementById("remainingTickets").textContent = currentCourt.tickets - currentTickets;
                }
            }
        });
        // Kích hoạt lần đầu để thiết lập trạng thái ban đầu
        ticketTypeSelect.dispatchEvent(new Event('change'));
    }

});