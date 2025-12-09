document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('loginMessage');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form submit truyền thống

            // 1. Lấy dữ liệu đăng nhập bằng Email
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            // ⭐️ CẬP NHẬT: Lấy giá trị email và mật khẩu ⭐️
            const inputEmail = emailInput.value.trim(); 
            const inputPassword = passwordInput.value.trim();

            if (!inputEmail || !inputPassword) {
                showMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.', 'error');
                return;
            }

            let foundUser = null;
            let targetKey = null;

            // 2. Lặp qua Local Storage để tìm tài khoản khớp
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Chỉ kiểm tra các key được lưu cho người dùng
                if (key.startsWith('user_')) {
                    const userDataRaw = localStorage.getItem(key);
                    try {
                        const userData = JSON.parse(userDataRaw);
                        
                        // ⭐️ CẬP NHẬT LOGIC: So sánh inputEmail với userData.email ⭐️
                        if (userData.email === inputEmail && userData.password === inputPassword) {
                            foundUser = userData;
                            targetKey = key;
                            break; // Tìm thấy tài khoản, thoát vòng lặp
                        }
                    } catch (e) {
                        console.error('Lỗi khi phân tích dữ liệu từ Local Storage:', e);
                        // Bỏ qua bản ghi bị hỏng
                    }
                }
            }

            // 3. Xử lý kết quả đăng nhập
            if (foundUser) {
                // Đăng nhập thành công
                localStorage.setItem('currentUser', foundUser.fullname); 
                localStorage.setItem('currentUserRole', foundUser.role || 'user');

                showMessage('Đăng nhập thành công!', 'success');
                
                // Chuyển hướng sau 500ms
                setTimeout(() => {
                    if (foundUser.role === 'admin') {
                        window.location.href = 'admin_dashboard.html';
                        } else if (foundUser.role === 'staff') {
                             window.location.href = 'staff_dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 500);

            } else {
                // Đăng nhập thất bại
                showMessage('Tài khoản không tồn tại hoặc mật khẩu không đúng. Vui lòng kiểm tra lại Email.', 'error');
            }
        });
    }
    
    // Hàm hiển thị thông báo (Giữ nguyên)
    function showMessage(message, type) {
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'message ' + type;
            messageElement.style.display = 'block';
        }
    }
});