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
            <p>${c.chat[0].text.substring(0, 40)}...</p>
        `;
        div.onclick = () => openChat(index);
        contactList.appendChild(div);
    });
}

loadContacts();

// Mở hội thoại
function openChat(index) {
    currentUserIndex = index;

    chatUser.innerText = "Trao đổi với: " + contacts[index].name;
    chatMessages.innerHTML = "";

    contacts[index].chat.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = msg.from === "staff" ? "chat-message-staff" : "chat-message-user";
        bubble.innerText = msg.text;
        chatMessages.appendChild(bubble);
    });

    chatBox.style.display = "block";
}

// Gửi tin trả lời
function sendReply() {
    const input = document.getElementById("replyInput");
    const text = input.value.trim();
    if (!text) return;

    contacts[currentUserIndex].chat.push({
        from: "staff",
        text: text,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("contactMessages", JSON.stringify(contacts));

    input.value = "";
    openChat(currentUserIndex);
}
