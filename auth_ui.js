document.addEventListener("DOMContentLoaded", function () {
    const welcomeContainer = document.getElementById("welcome-message-container");
    const welcomeText = document.getElementById("welcome-message-text");

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutContainer = document.getElementById("logout-link-container");

    const currentUser = localStorage.getItem("currentUser");
    const currentRole = localStorage.getItem("currentUserRole");

    if (currentUser) {
        // Ẩn đăng nhập / đăng ký
        loginLink.style.display = "none";
        registerLink.style.display = "none";

        // Hiện tên + đăng xuất
        welcomeContainer.style.display = "list-item";
        logoutContainer.style.display = "list-item";

        welcomeText.textContent = currentUser;

        // Khi click vào tên sẽ mở trang phù hợp
        welcomeText.addEventListener("click", function () {
            if (currentRole === "admin") {
                window.location.href = "admin_dashboard.html";
            } else {
                window.location.href = "user_profile.html";
            }
        });
    }

    // Nút đăng xuất
    const logoutBtn = document.getElementById("logout-button");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("currentUserRole");

            window.location.href = "index.html";
        });
    }
});
