// ----- LOAD USER INFORMATION -----
document.getElementById("username-display").innerText =
    localStorage.getItem("username") || "User";

document.getElementById("email-display").innerText =
    localStorage.getItem("email") || "email@gmail.com";

document.getElementById("phone-display").innerText =
    localStorage.getItem("phone") || "0123456789";

document.getElementById("join-date").innerText =
    localStorage.getItem("joinDate") || "10/12/2025";


// ----- AVATAR UPLOAD -----
let avatarInput = document.getElementById("upload-avatar");
let avatarImg = document.getElementById("avatar-img");

avatarInput.addEventListener("change", function () {
    const file = avatarInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        avatarImg.src = e.target.result;
        localStorage.setItem("avatar", e.target.result);
    };

    reader.readAsDataURL(file);
});

// Load avatar if stored
if (localStorage.getItem("avatar")) {
    avatarImg.src = localStorage.getItem("avatar");
}


// ----- LOAD BOOKING INFORMATION -----
let bookingList = JSON.parse(localStorage.getItem("bookings")) || [];

function loadBookings() {
    const tbody = document.getElementById("booking-body");
    tbody.innerHTML = "";

    bookingList.forEach(item => {
        tbody.innerHTML += `
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


// ----- LOGOUT -----
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
});


// ----- EDIT BUTTON (TÙY Ý LÀM SAU) -----
document.getElementById("edit-btn").addEventListener("click", () => {
    alert("Trang chỉnh sửa thông tin sẽ được thêm sau.");
});



// ====== HIỂN THỊ THÔNG TIN NGƯỜI DÙNG ======
document.getElementById("username-display").innerText =
    localStorage.getItem("username") || "User";

document.getElementById("email-display").innerText =
    localStorage.getItem("email") || "email@gmail.com";

document.getElementById("phone-display").innerText =
    localStorage.getItem("phone") || "0123456789";

document.getElementById("join-date").innerText =
    localStorage.getItem("joinDate") || "10/12/2025";


// ====== MODAL ======
const modal = document.getElementById("edit-modal");
const editBtn = document.getElementById("edit-btn");
const closeModal = document.getElementById("close-modal");
const saveEditBtn = document.getElementById("save-edit");

// Mở modal
editBtn.addEventListener("click", () => {
    modal.style.display = "block";

    document.getElementById("edit-name").value =
        localStorage.getItem("username") || "";

    document.getElementById("edit-email").value =
        localStorage.getItem("email") || "";

    document.getElementById("edit-address").value =
        localStorage.getItem("address") || "";

    document.getElementById("edit-phone").value =
        localStorage.getItem("phone") || "";
});

// Đóng modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Click ra ngoài để đóng
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// ====== LƯU THAY ĐỔI ======
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
    document.getElementById("username-display").innerText = newName;
    document.getElementById("email-display").innerText = newEmail;
    document.getElementById("phone-display").innerText = newPhone;

    modal.style.display = "none";

    alert("Cập nhật thông tin thành công!");
});
