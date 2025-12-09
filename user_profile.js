document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // KHAI BÁO BIẾN (ELEMENTS)
    // ===============================================
    const usernameDisplay = document.getElementById("username-display");
    const emailDisplay = document.getElementById("email-display");
    const phoneDisplay = document.getElementById("phone-display");
    const joinDateDisplay = document.getElementById("join-date");
    const backButton = document.getElementById("back-btn"); // <--- Đã đổi ID
    const editBtn = document.getElementById("edit-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.getElementById("close-modal");
    const saveEditBtn = document.getElementById("save-edit");
    const avatarInput = document.getElementById("upload-avatar");
    const avatarImg = document.getElementById("avatar-img");
    const bookingBody = document.getElementById("booking-body");
    
    // ===============================================
    // ----- LOAD USER INFORMATION & AVATAR -----
    // ===============================================
    
    // Hiển thị thông tin người dùng
    if(usernameDisplay) usernameDisplay.innerText = localStorage.getItem("username") || "User";
    if(emailDisplay) emailDisplay.innerText = localStorage.getItem("email") || "email@gmail.com";
    if(phoneDisplay) phoneDisplay.innerText = localStorage.getItem("phone") || "0123456789";
    if(joinDateDisplay) joinDateDisplay.innerText = localStorage.getItem("joinDate") || "10/12/2025";

    // Load avatar nếu stored
    if (localStorage.getItem("avatar") && avatarImg) {
        avatarImg.src = localStorage.getItem("avatar");
    }

    // Xử lý upload avatar
    if(avatarInput && avatarImg) {
        avatarInput.addEventListener("change", function () {
            const file = avatarInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                avatarImg.src = e.target.result;
                localStorage.setItem("avatar", e.target.result);
            };

            reader.readAsDataURL(file);
        });
    }

    // ===============================================
    // ----- LOAD BOOKING INFORMATION -----
    // ===============================================
    
    let bookingList = JSON.parse(localStorage.getItem("bookings")) || [];

    function loadBookings() {
        if (!bookingBody) return;
        bookingBody.innerHTML = "";

        bookingList.forEach(item => {
            bookingBody.innerHTML += `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.fieldName}</td>
                    <td>${item.fieldNumber}</td>
                    <td>${item.ticket}</td>
                    <td>${item.payment}</td>
                </tr>
            `;
        });
    }

    loadBookings();

    // ===============================================
    // ----- QUAY LẠI (THAY THẾ ĐĂNG XUẤT) -----
    // ===============================================
    if (backButton) {
        backButton.addEventListener("click", () => {
            // Quay lại trang trước đó trong lịch sử trình duyệt
            window.history.back(); 
        });
    }

    // ===============================================
    // ====== MODAL VÀ LƯU THAY ĐỔI ======
    // ===============================================
    
    // Mở modal
    if(editBtn && modal) {
        editBtn.addEventListener("click", () => {
            modal.style.display = "block";
            
            // Tải dữ liệu vào form
            document.getElementById("edit-name").value = localStorage.getItem("username") || "";
            document.getElementById("edit-email").value = localStorage.getItem("email") || "";
            document.getElementById("edit-address").value = localStorage.getItem("address") || "";
            document.getElementById("edit-phone").value = localStorage.getItem("phone") || "";
        });
    }

    // Đóng modal
    if(closeModal && modal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Click ra ngoài để đóng
    if(modal) {
        window.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }

    // Lưu thay đổi
    if(saveEditBtn && modal) {
        saveEditBtn.addEventListener("click", () => {
            const newName = document.getElementById("edit-name").value;
            const newEmail = document.getElementById("edit-email").value;
            const newAddress = document.getElementById("edit-address").value;
            const newPhone = document.getElementById("edit-phone").value;

            // Lưu vào localStorage
            localStorage.setItem("username", newName);
            localStorage.setItem("email", newEmail);
            localStorage.setItem("address", newAddress);
            localStorage.setItem("phone", newPhone);

            // Cập nhật lại giao diện
            if(usernameDisplay) usernameDisplay.innerText = newName;
            if(emailDisplay) emailDisplay.innerText = newEmail;
            if(phoneDisplay) phoneDisplay.innerText = newPhone;

            modal.style.display = "none";
            alert("Cập nhật thông tin thành công!");
        });
    }
});