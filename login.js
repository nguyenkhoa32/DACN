const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // 1. Thu thập dữ liệu form
    // Lấy giá trị từ trường "Tên hiển thị"
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('login-password').value;
    
    messageElement.textContent = '';
    messageElement.style.color = 'red';
    
    let userFound = false;
    let successfulLogin = false;

    // 2. LẶP QUA TẤT CẢ DỮ LIỆU ĐÃ LƯU TRONG localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Chỉ xử lý các Key liên quan đến người dùng
        if (key.startsWith('user_')) {
            const storedUserJSON = localStorage.getItem(key);
            const storedUserData = JSON.parse(storedUserJSON);
            
            // 3. SO SÁNH: Tên hiển thị (fullname) có khớp không?
            if (storedUserData.fullname === inputUsername) {
                userFound = true;
                
                // 4. SO SÁNH: Mật khẩu có khớp không?
                if (storedUserData.password === inputPassword) {
                    successfulLogin = true;
                    break; // Thoát vòng lặp ngay khi tìm thấy và đăng nhập thành công
                } else {
                    // Tìm thấy tên người dùng nhưng mật khẩu sai
                    messageElement.textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
                    return; // Dừng xử lý
                }
            }
        }
    }

    // 5. Kết quả cuối cùng
    if (successfulLogin) {
        messageElement.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
        messageElement.style.color = 'green';
        
        // Chuyển hướng đến trang chính
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1000); 
    } else if (!userFound) {
        // Sau khi lặp hết mà không tìm thấy tên hiển thị
        messageElement.textContent = 'Tài khoản không tồn tại. Vui lòng kiểm tra lại Tên hiển thị.';
    }
});