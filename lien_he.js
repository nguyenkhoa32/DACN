// =========================================
// GIẢ LẬP DỮ LIỆU TỪ TRANG CONTACT (form gửi)
// =========================================
// Format: { name, phone, address, message }
let contacts = JSON.parse(localStorage.getItem("contactMessages")) || [];

const contactList = document.getElementById("contactList");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatUser = document.getElementById("chatUser");

let currentUserIndex = -1;

// Load danh sách liên hệ
function loadContacts() {
    contactList.innerHTML = "";

    contacts.forEach((c, index) => {
        const div = document.createElement("div");
        div.className = "contact-card";
        div.innerHTML = `
            <strong>${c.name}</strong>
            <p>${c.message.substring(0, 50)}...</p>
        `;
        div.onclick = () => openChat(index);
        contactList.appendChild(div);
    });
}

loadContacts();

// Mở khung chat khi click 1 khách hàng
function openChat(index) {
    currentUserIndex = index;
    chatUser.innerText = "Trao đổi với: " + contacts[index].name;

    chatMessages.innerHTML = "";

    if (!contacts[index].chat) contacts[index].chat = [];

    contacts[index].chat.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = msg.from === "staff" ? "chat-message-staff" : "chat-message-user";
        bubble.innerText = msg.text;
        chatMessages.appendChild(bubble);
    });

    chatBox.style.display = "block";
}

// Gửi câu trả lời
function sendReply() {
    const input = document.getElementById("replyInput");
    const text = input.value.trim();
    if (!text) return;

    contacts[currentUserIndex].chat.push({ from: "staff", text });

    localStorage.setItem("contactMessages", JSON.stringify(contacts));

    input.value = "";
    openChat(currentUserIndex);
}
