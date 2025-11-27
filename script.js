document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('searchDate');
    
    // Kiểm tra xem input có tồn tại không
    if (dateInput) {
        // Lấy ngày hiện tại
        const today = new Date();
        
        // Định dạng ngày thành YYYY-MM-DD (format bắt buộc cho HTML5 input[type="date"].min)
        
        const year = today.getFullYear();
        // Tháng (bắt đầu từ 0) + 1, sau đó dùng padStart để có 2 chữ số (ví dụ: 01, 12)
        const month = String(today.getMonth() + 1).padStart(2, '0');
        // Ngày, dùng padStart để có 2 chữ số (ví dụ: 05, 27)
        const day = String(today.getDate()).padStart(2, '0');
        
        // Tạo chuỗi ngày định dạng YYYY-MM-DD
        const minDate = `${year}-${month}-${day}`;
        
        // ⭐️ Áp dụng thuộc tính 'min' vào input date ⭐️
        dateInput.min = minDate;
    }
    
    // --- BẠN CÓ THỂ THÊM CÁC LOGIC JAVASCRIPT KHÁC CỦA TRANG CHỦ TẠI ĐÂY ---
});