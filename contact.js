document.getElementById("send-contact").addEventListener("click", () => {

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    const chat = JSON.parse(localStorage.getItem("chat_messages")) || [];

    chat.push({
        sender: "user",
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("chat_messages", JSON.stringify(chat));

    alert("Đã gửi tin nhắn đến nhân viên!");

    document.getElementById("contact-message").value = "";
});
