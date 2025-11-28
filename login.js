document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message'); 

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const inputUsername = document.getElementById('username').value.trim(); 
            const inputPassword = document.getElementById('password').value.trim(); 
            
            if (messageElement) {
                messageElement.textContent = '';
                messageElement.style.color = 'red';
            }

            let successfullLogin = false;
            let userFound = false;

            const keys = Object.keys(localStorage);
            
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                
                if (key.startsWith('user_')) {
                    try { 
                        const storedValue = localStorage.getItem(key);
                        const storedUserData = JSON.parse(storedValue); 
                        
                        // ⭐️ Đã sửa: dùng storedUserData.fullname (chữ thường) ⭐️
                        if (storedUserData.fullname === inputUsername) {
                            userFound = true;
                            
                            if (storedUserData.password === inputPassword) {
                                successfullLogin = true;
                                
                                // Lấy role trực tiếp
                                const role = storedUserData.role || 'user'; 
                                
                                // ⭐️ Đã sửa: dùng storedUserData.fullname (chữ thường) ⭐️
                                localStorage.setItem('currentUser', storedUserData.fullname);
                                localStorage.setItem('currentUserRole', role);
                                
                                break; 
                            } else {
                                if (messageElement) {
                                    messageElement.textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
                                }
                                return; 
                            }
                        }
                    } catch (e) { 
                        console.error("Lỗi khi phân tích dữ liệu từ Local Storage:", e);
                        continue; 
                    }
                }
            }

            if (successfullLogin) {
                if (messageElement) {
                    messageElement.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
                    messageElement.style.color = 'green';
                }
                
                setTimeout(() => {
                    const userRole = localStorage.getItem('currentUserRole');
                    
                    if (userRole === 'admin') {
                        // Chuyển hướng đến trang Admin Dashboard
                        window.location.href = 'admin_dashboard.html'; 
                    } else {
                        // Chuyển hướng đến trang người dùng thường
                        window.location.href = 'index.html';
                    }
                }, 1000); 
                
            } else if (!userFound) {
                if (messageElement) {
                    messageElement.textContent = 'Tài khoản không tồn tại. Vui lòng kiểm tra lại Tên hiển thị.';
                }
            }
        });
    }
});