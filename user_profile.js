document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // NÚT QUAY LẠI TRANG TRƯỚC
    // ============================
    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // ============================
    // HIỂN THỊ THÔNG TIN NGƯỜI DÙNG
    // ============================
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

    // ============================
    // HIỂN THỊ DANH SÁCH ĐẶT SÂN
    // ============================
    const bookingBody = document.getElementById("booking-body");

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (bookings.length === 0) {
        bookingBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#777;">
                    Chưa có lịch đặt sân nào.
                </td>
            </tr>
        `;
    } else {
        bookingBody.innerHTML = "";
        bookings.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.date || "-"}</td>
                <td>${item.time || "-"}</td>
                <td>${item.fieldName}</td>
                <td>${item.fieldNumber}</td>
                <td>${item.ticket}</td>
                <td>${item.payment}</td>
            `;

            bookingBody.appendChild(row);
        });
    }

    // ============================
    // CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG
    // ============================
    const editBtn = document.getElementById("edit-btn");
    const modal = document.getElementById("edit-modal");
    const closeModal = document.getElementById("close-modal");

    const editName = document.getElementById("edit-name");
    const editEmail = document.getElementById("edit-email");
    const editAddress = document.getElementById("edit-address");
    const editPhone = document.getElementById("edit-phone");
    const saveEdit = document.getElementById("save-edit");

    editBtn.addEventListener("click", () => {
        editName.value = user.name;
        editEmail.value = user.email;
        editAddress.value = user.address;
        editPhone.value = user.phone;

        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveEdit.addEventListener("click", () => {
        const updated = {
            name: editName.value,
            email: editEmail.value,
            phone: editPhone.value,
            address: editAddress.value
        };

        localStorage.setItem("userProfile", JSON.stringify(updated));

        nameDisplay.textContent = updated.name;
        emailDisplay.textContent = updated.email;
        phoneDisplay.textContent = updated.phone;
        addressDisplay.textContent = updated.address;

        modal.style.display = "none";

        alert("Cập nhật thông tin thành công!");
    });

});
