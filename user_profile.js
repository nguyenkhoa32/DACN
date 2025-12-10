document.addEventListener("DOMContentLoaded", function () {

    // ----- LOAD USER PROFILE (GIỮ NGUYÊN CODE CŨ) -----
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

    // ----- LOAD CHAT LIÊN HỆ -----
    let contacts = JSON.parse(localStorage.getItem("contactMessages")) || [];

    // Chat phải lấy đúng email của user
    const userContact = contacts.find(c => c.email === user.email);

    const userChatMessages = document.getElementById("userChatMessages");
    const userChatInput = document.getElementById("userChatInput");
    const userSendBtn = document.getElementById("userSendBtn");

    function loadUserChat() {
        userChatMessages.innerHTML = "";

        if (!userContact) {
            userChatMessages.innerHTML = "<p>Chưa có tin nhắn nào.</p>";
            return;
        }

        userContact.chat.forEach(msg => {
            const div = document.createElement("div");
            div.className = msg.from === "staff" ? "chat-message-staff" : "chat-message-user";
            div.innerText = msg.text;
            userChatMessages.appendChild(div);
        });
    }

    loadUserChat();

    // User gửi tin nhắn
    userSendBtn.addEventListener("click", () => {
        const text = userChatInput.value.trim();
        if (!text) return;

        if (!userContact) return;

        userContact.chat.push({
            from: "user",
            text: text,
            time: new Date().toLocaleString()
        });

        localStorage.setItem("contactMessages", JSON.stringify(contacts));

        userChatInput.value = "";
        loadUserChat();
    });

});
