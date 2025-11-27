const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

// ⭐️ TÀI KHOẢN ADMIN CỐ ĐỊNH ⭐️
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin1"; // Bạn nên đổi mật khẩu này

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // 1. Thu thập dữ liệu form
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('login-password').value;
    
    messageElement.textContent = '';
    messageElement.style.color = 'red';
    
    let userFound = false;
    let successfulLogin = false;

    // =======================================================
    // 2. BƯỚC 1: KIỂM TRA TÀI KHOẢN ADMIN CỐ ĐỊNH
    // =======================================================
    if (inputUsername === ADMIN_USERNAME && inputPassword === ADMIN_PASSWORD) {
        successfulLogin = true;
        
        // Chuyển hướng đến trang Admin Dashboard
        messageElement.textContent = 'Đăng nhập Admin thành công! Đang chuyển hướng...';
        messageElement.style.color = 'green';
        
        setTimeout(() => {
            // Chuyển hướng đến file Admin Dashboard (ví dụ: admin_dashboard.html)
            window.location.href = 'admin_dashboard.html'; 
        }, 1000);
        return; // Dừng xử lý ngay lập tức sau khi Admin đăng nhập
    }

    // =======================================================
    // 3. BƯỚC 2: KIỂM TRA TÀI KHOẢN NGƯỜI DÙNG BÌNH THƯỜNG (DÙNG localStorage)
    // =======================================================
    
    // LẶP QUA TẤT CẢ DỮ LIỆU ĐÃ LƯU TRONG localStorage (dành cho người dùng thường)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Chỉ xử lý các Key liên quan đến người dùng
        if (key.startsWith('user_')) {
            const storedUserJSON = localStorage.getItem(key);
            const storedUserData = JSON.parse(storedUserJSON);
            
            // SO SÁNH: Tên hiển thị (fullname) có khớp không?
            if (storedUserData.fullname === inputUsername) {
                userFound = true;
                
                // SO SÁNH: Mật khẩu có khớp không?
                if (storedUserData.password === inputPassword) {
                    successfulLogin = true;
                    
                    // Chuyển hướng đến trang chính của người dùng
                    messageElement.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
                    messageElement.style.color = 'green';
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 1000);
                    return; // Dừng xử lý và thoát
                } else {
                    // Tìm thấy tên người dùng nhưng mật khẩu sai
                    messageElement.textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
                    return; 
                }
            }
        }
    }

    // 4. Kết quả cuối cùng (Nếu không phải admin và không phải người dùng thường)
    if (!successfulLogin && !userFound) {
        messageElement.textContent = 'Tài khoản không tồn tại. Vui lòng kiểm tra lại Tên hiển thị.';
    }
});