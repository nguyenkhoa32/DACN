// =========================================================
// CODE CHUYỂN ĐỔI DỮ LIỆU CŨ SANG ĐỊNH DẠNG MỚI ('users')
// *CHỈ CHẠY MỘT LẦN KHI BẠN TẢI TRANG ĐĂNG NHẬP*
// =========================================================
function migrateOldUsersData() {
    // Chuyển đổi dữ liệu cũ (user_1, user_2) sang định dạng mảng thống nhất ('users')
    // Logic này giữ nguyên như bạn đã cung cấp
    let allUsers = [];
    let oldUserFound = false;
    
    // 1. Quét Local Storage để tìm các key cũ ('user_1', 'user_2', ...)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const userDataRaw = localStorage.getItem(key);
            try {
                const userData = JSON.parse(userDataRaw);
                allUsers.push(userData);
                // Xóa key cũ sau khi chuyển đổi thành công
                localStorage.removeItem(key); 
                oldUserFound = true;
            } catch (e) {
                // Bỏ qua bản ghi bị hỏng
            }
        }
    }
    
    // 2. Nếu tìm thấy dữ liệu cũ, gộp chúng và lưu vào key 'users'
    if (oldUserFound) {
        // ... (Logic gộp dữ liệu giữ nguyên)
        // Lấy dữ liệu 'users' hiện tại (để tránh ghi đè) và gộp lại
        const currentUsers = localStorage.getItem('users');
        if (currentUsers) {
            try {
                // Lưu ý: Cần chuyển mảng users thành object map để logic user_profile hoạt động
                // Tuy nhiên, vì code user_profile đang dùng mảng, ta tạm giữ mảng cho khối này
                allUsers = JSON.parse(currentUsers).concat(allUsers);
            } catch (e) {
                // Lỗi phân tích cú pháp JSON của key 'users', bỏ qua dữ liệu đó
            }
        }

        // Lưu mảng gộp cuối cùng
        localStorage.setItem('users', JSON.stringify(allUsers));
        console.log(`[MIGRATION]: Đã chuyển đổi thành công ${allUsers.length} người dùng sang key 'users'.`);
    }
}

// Chạy hàm chuyển đổi ngay lập tức
migrateOldUsersData(); 

// =========================================================
// LOGIC CHÍNH BẮT ĐẦU TỪ ĐÂY
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === PHẦN TỬ CHUNG ===
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('loginMessage');
    
    // === PHẦN TỬ MODAL QUÊN MẬT KHẨU ===
    const forgotModal = document.getElementById('forgotPasswordModal');
    const forgotLink = document.getElementById('forgotPasswordLink'); 
    const closeForgotModal = document.getElementById('closeForgotModal');
    
    const verifyEmailForm = document.getElementById('verifyEmailForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const resetEmailDisplay = document.getElementById('resetEmailDisplay');
    const forgotEmailInput = document.getElementById('forgotEmail');
    
    let userEmailToReset = ''; // Biến lưu email người dùng đang đặt lại mật khẩu


    // --- HÀM HỖ TRỢ DỮ LIỆU VÀ GIAO DIỆN ---
    
    // Hàm mô phỏng lấy dữ liệu người dùng (từ Local Storage, key 'users')
    function getUsersData() {
        const storedUsers = localStorage.getItem('users');
        // Trả về mảng (như cấu trúc bạn đang sử dụng trong logic tìm kiếm)
        return storedUsers ? JSON.parse(storedUsers) : []; 
    }

    // Hàm lưu dữ liệu người dùng (vào Local Storage, key 'users')
    function saveUsersData(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Hàm hiển thị thông báo
    function showMessage(message, type) {
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'message'; // Reset class
            
            // Đặt màu dựa trên type 
            if (type === 'error') {
                 messageElement.style.color = 'red';
            } else if (type === 'success') {
                 messageElement.style.color = 'green';
            }
            
            messageElement.style.display = 'block';
        }
    }


    // === 1. LOGIC XỬ LÝ ĐĂNG NHẬP ===
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const inputEmail = document.getElementById('email').value.trim(); 
            const inputPassword = document.getElementById('password').value.trim();

            if (!inputEmail || !inputPassword) {
                showMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.', 'error');
                return;
            }

            // Lấy toàn bộ mảng người dùng từ Local Storage
            const users = getUsersData();
            
            // Tìm tài khoản khớp trong mảng
            const foundUser = users.find(userData => 
                userData.email === inputEmail && userData.password === inputPassword
            );

            // Xử lý kết quả đăng nhập
            if (foundUser) {
                // Đăng nhập thành công: Lưu trạng thái và chuyển hướng
                localStorage.setItem('currentUser', foundUser.fullname); 
                localStorage.setItem('currentUserRole', foundUser.role || 'user');

                // *** DÒNG ĐÃ CHỈNH SỬA: LƯU EMAIL CHÍNH XÁC ***
                localStorage.setItem('currentUserEmail', foundUser.email); 

                showMessage('Đăng nhập thành công!', 'success');
                
                // Chuyển hướng sau 500ms
                setTimeout(() => {
                    if (foundUser.role === 'admin') {
                        window.location.href = 'admin_dashboard.html';
                    } else if (foundUser.role === 'staff') {
                        window.location.href = 'staff_dashboard.html';
                    } else {
                        window.location.href = 'index.html'; // Trang chính
                    }
                }, 500);

            } else {
                // Đăng nhập thất bại
                showMessage('Tài khoản không tồn tại hoặc mật khẩu không đúng. Vui lòng kiểm tra lại Email.', 'error');
            }
        });
    }

    // === 2. LOGIC XỬ LÝ QUÊN MẬT KHẨU (Giữ nguyên) ===

    // Mở Modal Quên Mật Khẩu
    forgotLink?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset trạng thái form trước khi mở
        verifyEmailForm.style.display = 'block';
        resetPasswordForm.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        forgotEmailInput.value = '';
        
        forgotModal.style.display = 'block';
    });

    // Đóng Modal (Nút X)
    closeForgotModal?.addEventListener('click', function() {
        forgotModal.style.display = 'none';
    });
    
    // Đóng Modal (Click ra ngoài)
    window.onclick = function(event) {
        if (event.target == forgotModal) {
            forgotModal.style.display = 'none';
        }
    };


    // Xử lý Form 1: Xác nhận Email
    verifyEmailForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = forgotEmailInput.value;
        const users = getUsersData();

        const user = users.find(u => u.email === email);

        if (user) {
            // Email hợp lệ: Chuyển sang Form 2
            userEmailToReset = email;
            resetEmailDisplay.textContent = email;
            
            verifyEmailForm.style.display = 'none';
            resetPasswordForm.style.display = 'block';
            passwordError.style.display = 'none';
            emailError.style.display = 'none';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmNewPassword').value = '';

        } else {
            // Email không hợp lệ: Hiển thị lỗi
            emailError.style.display = 'block';
        }
    });


    // Xử lý Form 2: Đặt lại Mật khẩu
    resetPasswordForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmNewPassword').value;

        if (newPass !== confirmPass) {
            // Mật khẩu không khớp
            passwordError.style.display = 'block';
            return;
        }

        // Mật khẩu khớp: Tiến hành đặt lại
        let users = getUsersData();
        const userIndex = users.findIndex(u => u.email === userEmailToReset);

        if (userIndex !== -1) {
            // Cập nhật mật khẩu mới
            users[userIndex].password = newPass; 
            saveUsersData(users);

            // Thông báo thành công và đóng Modal
            forgotModal.style.display = 'none';
            alert('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
            
            // Xóa email đang đặt lại
            userEmailToReset = ''; 

        } else {
            // Lỗi hiếm gặp
            alert('Lỗi hệ thống: Không tìm thấy tài khoản để cập nhật.');
        }
    });
});