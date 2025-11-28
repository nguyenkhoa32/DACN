document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy thông tin tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location') || ''; // Lấy địa điểm, nếu không có thì là chuỗi rỗng
    const date = urlParams.get('date');
    const time = urlParams.get('time');

    // Cập nhật tiêu đề trang
    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) {
        // Hiển thị tên quận đã tìm kiếm hoặc 'Tất Cả Các Quận'
        locationDisplay.textContent = location || 'Tất Cả Các Quận';
    }


    // 2. Dữ liệu các sân (MỞ RỘNG - 5 SÂN CHO MỖI QUẬN)
    const allCourts = [
        // --- SÂN QUẬN HẢI CHÂU (5 SÂN) ---
        { id: 1, name: "Sân Hải Châu Premium A", type: "Thảm PVC", tickets: 10, open: "04:30", close: "22:00", image: "img/san_haichau_pre.jpg", district: "Hải Châu" },
        { id: 2, name: "Sân Bồ Đề", type: "Thảm Cao Su", tickets: 5, open: "05:00", close: "23:00", image: "img/san_bode.jpg", district: "Hải Châu" },
        { id: 3, name: "Sân Nguyễn Văn Linh", type: "Sàn Gỗ", tickets: 8, open: "06:00", close: "21:00", image: "img/san_nvl.jpg", district: "Hải Châu" },
        { id: 4, name: "Sân 2/9 Club", type: "Thảm PVC", tickets: 3, open: "05:30", close: "23:30", image: "img/san_29.jpg", district: "Hải Châu" },
        { id: 5, name: "Sân Đà Nẵng Centre", type: "Thảm Cao Su", tickets: 6, open: "05:00", close: "22:30", image: "img/san_dn_center.jpg", district: "Hải Châu" },

        // --- SÂN QUẬN THANH KHÊ (5 SÂN) ---
        { id: 6, name: "Sân Thanh Khê 1", type: "Thảm PVC", tickets: 5, open: "05:00", close: "22:00", image: "img/san_thanhkhe_1.jpg", district: "Thanh Khê" },
        { id: 7, name: "Sân Thanh Khê 2", type: "Sàn Gỗ", tickets: 2, open: "06:00", close: "23:00", image: "img/san_thanhkhe_2.jpg", district: "Thanh Khê" },
        { id: 8, name: "Sân Hà Huy Tập", type: "Thảm Cao Su", tickets: 7, open: "04:30", close: "21:30", image: "img/san_hht.jpg", district: "Thanh Khê" },
        { id: 9, name: "Sân Điện Biên Phủ", type: "Thảm PVC", tickets: 4, open: "05:30", close: "22:30", image: "img/san_dbp.jpg", district: "Thanh Khê" },
        { id: 10, name: "Sân Sỹ Quan", type: "Sàn Gỗ", tickets: 1, open: "06:30", close: "23:00", image: "img/san_syquan.jpg", district: "Thanh Khê" },

        // --- SÂN QUẬN SƠN TRÀ (5 SÂN) ---
        { id: 11, name: "Sân Sơn Trà Star", type: "Sàn Gỗ", tickets: 2, open: "06:00", close: "23:00", image: "img/san_sontra_star.jpg", district: "Sơn Trà" },
        { id: 12, name: "Sân Hoàng Sa", type: "Thảm PVC", tickets: 9, open: "05:00", close: "22:00", image: "img/san_hoangsa.jpg", district: "Sơn Trà" },
        { id: 13, name: "Sân Mân Thái", type: "Thảm Cao Su", tickets: 6, open: "04:30", close: "21:00", image: "img/san_mantai.jpg", district: "Sơn Trà" },
        { id: 14, name: "Sân Phạm Văn Đồng", type: "Thảm PVC", tickets: 3, open: "05:30", close: "23:30", image: "img/san_pvd.jpg", district: "Sơn Trà" },
        { id: 15, name: "Sân Đông", type: "Sàn Gỗ", tickets: 5, open: "05:00", close: "22:30", image: "img/san_dong.jpg", district: "Sơn Trà" },
        
        // --- SÂN QUẬN LIÊN CHIỂU (5 SÂN) ---
        { id: 16, name: "Sân Bách Khoa", type: "Thảm PVC", tickets: 7, open: "05:00", close: "23:00", image: "img/lienchieu1.png", district: "Liên Chiểu" },
        { id: 17, name: "Sân Nguyễn Lương Bằng", type: "Sàn Gỗ", tickets: 4, open: "06:00", close: "22:00", image: "img/lienchieu2.png", district: "Liên Chiểu" },
        { id: 18, name: "Sân Kinh Doanh", type: "Thảm Cao Su", tickets: 8, open: "04:30", close: "21:00", image: "img/lienchieu6.png", district: "Liên Chiểu" },
        { id: 19, name: "Sân Hòa Khánh", type: "Thảm PVC", tickets: 2, open: "05:30", close: "23:00", image: "img/lienchieu4.png", district: "Liên Chiểu" },
        { id: 20, name: "Sân Đà Nẵng Tây", type: "Sàn Gỗ", tickets: 5, open: "05:00", close: "22:30", image: "img/lienchieu7.png", district: "Liên Chiểu" },
        
        // --- SÂN QUẬN CẨM LỆ (5 SÂN) ---
        { id: 21, name: "Sân Cẩm Lệ Mới", type: "Thảm PVC", tickets: 6, open: "05:00", close: "22:00", image: "img/san_camle_moi.jpg", district: "Cẩm Lệ" },
        { id: 22, name: "Sân Tuyên Sơn", type: "Sàn Gỗ", tickets: 3, open: "06:00", close: "23:00", image: "img/san_ts.jpg", district: "Cẩm Lệ" },
        { id: 23, name: "Sân Phan Đăng Lưu", type: "Thảm Cao Su", tickets: 9, open: "04:30", close: "21:00", image: "img/san_pdl.jpg", district: "Cẩm Lệ" },
        { id: 24, name: "Sân Nguyễn Hữu Thọ", type: "Thảm PVC", tickets: 4, open: "05:30", close: "23:30", image: "img/san_nht.jpg", district: "Cẩm Lệ" },
        { id: 25, name: "Sân Hòa Xuân", type: "Sàn Gỗ", tickets: 7, open: "05:00", close: "22:30", image: "img/san_hoaxuan.jpg", district: "Cẩm Lệ" },
    ];

    // 3. Lọc sân theo địa điểm tìm kiếm
    const filteredCourts = allCourts.filter(court => {
        // Nếu địa điểm rỗng (người dùng không nhập), hiển thị tất cả
        if (!location) return true; 
        
        // Ngược lại, lọc theo quận/huyện
        return court.district.toLowerCase() === location.toLowerCase();
    });

    const container = document.getElementById('court-list-container');
    const noResults = document.getElementById('no-results-message');

    if (filteredCourts.length === 0) {
        // Hiển thị thông báo không có kết quả
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        
        // 4. Tạo và chèn thẻ sân vào container
        filteredCourts.forEach(court => {
            const card = document.createElement('div');
            card.className = 'court-card';
            
            // Nội dung thẻ sân
            card.innerHTML = `
                <div class="court-img" style="background-image: url('${court.image}');"></div>
                <div class="court-info">
                    <h3 class="court-name">${court.name}</h3>
                    <p class="court-location">📍 ${court.district}</p>
                    <div class="court-details">
                        <span class="detail-item"> Loại Sân: <b>${court.type}</b></span>
                        <span class="detail-item"> Vé Còn: <b>${court.tickets}</b></span>
                    </div>
                    <p class="court-time">⏰ Mở: ${court.open} - Đóng: ${court.close}</p>
                    <button class="book-btn">Đặt Sân Ngay</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
});