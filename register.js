// Lấy form và element hiển thị thông báo
const form = document.getElementById('registrationForm');
const messageElement = document.getElementById('message');

// Lắng nghe sự kiện "submit" của form (khi bấm nút ĐĂNG KÝ)
form.addEventListener('submit', function(event) {
    // Ngăn chặn hành vi gửi form mặc định (tránh tải lại trang)
    event.preventDefault(); 
    
    // 1. Thu thập dữ liệu form
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value; // Dùng làm Tên hiển thị/Username
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Reset thông báo
    messageElement.textContent = '';
    messageElement.style.color = 'red';

    // 2. Xác thực cơ bản: Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
        messageElement.textContent = 'Lỗi: Mật khẩu xác nhận không khớp!';
        return; 
    }
    
    // 3. Kiểm tra tính duy nhất của Tên hiển thị (fullname)
    // Duyệt qua tất cả các mục đã lưu trong localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Chỉ xử lý các Key người dùng (bắt đầu bằng 'user_')
        if (key.startsWith('user_')) {
            const storedUserJSON = localStorage.getItem(key);
            const storedUser = JSON.parse(storedUserJSON);
            
            // Kiểm tra xem Tên hiển thị (fullname) đã được đăng ký chưa
            if (storedUser.fullname === fullname) { 
                messageElement.textContent = 'Lỗi: Tên hiển thị (Tên đầy đủ) này đã được sử dụng!';
                return;
            }
            
            // Tùy chọn: Kiểm tra luôn email đã tồn tại chưa
            if (storedUser.email === email) {
                messageElement.textContent = 'Lỗi: Địa chỉ Email này đã được đăng ký!';
                return;
            }
        }
    }
    
    // 4. Tạo đối tượng dữ liệu người dùng
    const userData = {
        phone: phone,
        email: email,
        fullname: fullname, // Lưu Tên hiển thị/Username
        password: password // LƯU Ý: Không an toàn trong môi trường thực tế
    };

    // 5. Lưu dữ liệu vào localStorage
    try {
        // Vẫn dùng email làm key chính để đảm bảo duy nhất
        localStorage.setItem('user_' + email, JSON.stringify(userData));
        
        // 6. Thông báo thành công và chuyển trang
        messageElement.textContent = 'Đăng ký thành công! Đang chuyển hướng đến trang Đăng Nhập...';
        messageElement.style.color = 'green';
        
        // Chuyển hướng sang trang đăng nhập sau 2 giây
        setTimeout(() => {
            // Thay thế 'login.html' bằng tên file trang đăng nhập của bạn
            window.location.href = 'login.html'; 
        }, 2000); 

    } catch (e) {
        // Xử lý lỗi nếu localStorage đầy hoặc không khả dụng
        messageElement.textContent = 'Lỗi lưu dữ liệu: LocalStorage không khả dụng.';
        messageElement.style.color = 'red';
    }
});