document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy các phần tử HTML từ menu (SỬ DỤNG CÁC ID TỪ FILE INDEX.HTML ĐÃ SỬA)
    const registerLink = document.getElementById('register-link'); 
    const loginLink = document.getElementById('login-link'); 
    const welcomeContainer = document.getElementById('welcome-message-container');
    const welcomeText = document.getElementById('welcome-message-text');
    const logoutContainer = document.getElementById('logout-link-container');
    const logoutButton = document.getElementById('logout-button');

    // 2. Lấy tên người dùng hiện tại (KEY QUAN TRỌNG)
    const currentUsername = localStorage.getItem('currentUser'); 

    // ⭐️ BƯỚC DEBUG: KIỂM TRA TRẠNG THÁI TRONG CONSOLE (F12) ⭐️
    console.log("--- DEBUG TRẠNG THÁI MENU ---");
    console.log("1. Tên người dùng (currentUser):", currentUsername);
    console.log("2. registerLink ID found:", !!registerLink);
    console.log("3. welcomeContainer ID found:", !!welcomeContainer);
    console.log("4. logoutButton ID found:", !!logoutButton);
    console.log("------------------------------");


    function updateHeaderUI() {
        if (currentUsername) {
            // Đã đăng nhập: Ẩn Đăng nhập/Đăng ký
            if (registerLink) registerLink.style.display = 'none';
            if (loginLink) loginLink.style.display = 'none';

            // Hiện Chào mừng/Đăng xuất
            // Dùng 'list-item' để đảm bảo nó hiển thị đúng là một mục menu
            if (welcomeContainer) welcomeContainer.style.display = 'list-item'; 
            if (logoutContainer) logoutContainer.style.display = 'list-item'; 

            // Hiển thị tên người dùng
            if (welcomeText) {
                welcomeText.textContent = 'Chào, ' + currentUsername; 
            }
        } else {
            // Chưa đăng nhập: Hiện Đăng nhập/Đăng ký
            if (registerLink) registerLink.style.display = 'list-item';
            if (loginLink) loginLink.style.display = 'list-item';
            
            // Ẩn Chào mừng/Đăng xuất
            if (welcomeContainer) welcomeContainer.style.display = 'none';
            if (logoutContainer) logoutContainer.style.display = 'none';
        }
    }
    
    // 3. Xử lý Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserRole');

            window.location.href = 'index.html';
        });
    }

    // 4. Gọi hàm để thiết lập giao diện ban đầu
    updateHeaderUI();
});