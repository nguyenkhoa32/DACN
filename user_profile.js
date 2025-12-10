document.addEventListener("DOMContentLoaded", function () {

    // ======================================================
    // 1) LOAD THÔNG TIN USER
    // ======================================================
    const nameDisplay = document.getElementById("username-display");
    const emailDisplay = document.getElementById("email-display");
    const phoneDisplay = document.getElementById("phone-display");
    const addressDisplay = document.getElementById("address-display");

    const user = JSON.parse(localStorage.getItem("userProfile")) || {
        name: "Tên người dùng",
        email: "email@example.com",
        phone: "0123456789",
        address: ""
    };

    nameDisplay.textContent = user.name;
    emailDisplay.textContent = user.email;
    phoneDisplay.textContent = user.phone;
    addressDisplay.textContent = user.address;


    // ======================================================
    // 2) NÚT QUAY LẠI TRANG CHỦ
    // ======================================================
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "index.html"; // ĐƯỜNG DẪN TRANG CHỦ
        });
    }


    // ======================================================
    // 3) LOAD DANH SÁCH ĐẶT SÂN
    // ======================================================
    const bookingBody = document.getElementById("booking-body");
    const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];

    function loadBookings() {
        bookingBody.innerHTML = "";

        if (bookings.length === 0) {
            bookingBody.innerHTML = "<tr><td colspan='6'>Chưa có lịch đặt sân.</td></tr>";
            return;
        }

        bookings.forEach(b => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${b.date}</td>
                <td>${b.time}</td>
                <td>${b.courtName}</td>
                <td>${b.courtNumber}</td>
                <td>${b.ticketCount}</td>
                <td>${b.payment}</td>
            `;
            bookingBody.appendChild(tr);
        });
    }

    loadBookings();


    // ======================================================
    // 4) CHAT LIÊN HỆ
    // ======================================================
    const msgBox = document.getElementById("userChatMessages");
    const msgInput = document.getElementById("userChatInput");
    const sendBtn = document.getElementById("userSendBtn");

    let contacts = JSON.parse(localStorage.getItem("contactMessages")) || [];

    // Tìm đúng chat theo email user
    let userContact = contacts.find(c => c.email === user.email);

    // Nếu chưa có -> tạo mới
    if (!userContact) {
        userContact = {
            email: user.email,
            name: user.name,
            chat: []
        };
        contacts.push(userContact);
        localStorage.setItem("contactMessages", JSON.stringify(contacts));
    }

    // Hiển thị chat
    function loadChat() {
        if (!msgBox) return;

        msgBox.innerHTML = "";

        if (userContact.chat.length === 0) {
            msgBox.innerHTML = "<p>Chưa có tin nhắn nào.</p>";
            return;
        }

        userContact.chat.forEach(msg => {
            const div = document.createElement("div");
            div.className = msg.from === "staff" ? "chat-message-staff" : "chat-message-user";
            div.textContent = msg.text;
            msgBox.appendChild(div);
        });

        msgBox.scrollTop = msgBox.scrollHeight; // Auto scroll
    }

    loadChat();

    // Gửi tin nhắn
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const text = msgInput.value.trim();
            if (!text) return;

            userContact.chat.push({
                from: "user",
                text: text,
                time: new Date().toLocaleString()
            });

            localStorage.setItem("contactMessages", JSON.stringify(contacts));

            msgInput.value = "";
            loadChat();
        });
    }


    // ======================================================
    // 5) CHỈNH SỬA THÔNG TIN USER
    // ======================================================
    const editBtn = document.getElementById("edit-btn");
    const modal = document.getElementById("edit-modal");
    const saveBtn = document.getElementById("save-edit");
    const closeBtn = document.getElementById("close-modal");

    if (editBtn) {
        editBtn.onclick = () => {
            document.getElementById("edit-name").value = user.name;
            document.getElementById("edit-email").value = user.email;
            document.getElementById("edit-address").value = user.address;
            document.getElementById("edit-phone").value = user.phone;

            modal.style.display = "flex";
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    if (saveBtn) {
        saveBtn.onclick = () => {
            user.name = document.getElementById("edit-name").value;
            user.email = document.getElementById("edit-email").value;
            user.address = document.getElementById("edit-address").value;
            user.phone = document.getElementById("edit-phone").value;

            localStorage.setItem("userProfile", JSON.stringify(user));
            location.reload();
        };
    }

});
// Lắng nghe khi người dùng chọn file
document.getElementById("upload-avatar").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Kiểm tra có phải hình ảnh hay không
    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn đúng file hình ảnh.");
        return;
    }

    // Tạo URL xem trước
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("avatar-img").src = e.target.result;
    };
    reader.readAsDataURL(file);
});




const avatarImg = document.getElementById("avatar-img");
const uploadInput = document.getElementById("upload-avatar");

// 1. Khi load trang -> lấy avatar đã lưu trong LocalStorage
const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
    avatarImg.src = savedAvatar;
}

// 2. Khi chọn ảnh mới
uploadInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Chỉ cho phép file hình ảnh
    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh hợp lệ.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Hiển thị avatar mới
        avatarImg.src = e.target.result;

        // LƯU vào LocalStorage
        localStorage.setItem("userAvatar", e.target.result);
    };
    reader.readAsDataURL(file);
});
