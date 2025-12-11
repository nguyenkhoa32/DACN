// Cập nhật thời gian ca khi chọn
document.getElementById("scheduleShift").addEventListener("change", function () {
    const shift = this.value;
    const text = document.getElementById("shiftTimeText");

    if (shift === "Sáng") text.textContent = "06:00 - 12:00";
    if (shift === "Chiều") text.textContent = "12:00 - 18:00";
    if (shift === "Tối") text.textContent = "18:00 - 23:00";
});

// Lấy danh sách ca từ localStorage
let shiftList = JSON.parse(localStorage.getItem("shiftList")) || [];

let editIndex = -1; // -1 = thêm mới, khác -1 = sửa


// HIỂN THỊ DANH SÁCH CA
function renderShiftList() {
    const tbody = document.getElementById("shiftList");
    tbody.innerHTML = "";

    shiftList.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.ca}</td>
            <td>${item.ngay}</td>
            <td>${item.gio}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editShift(${index})">Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteShift(${index})">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

renderShiftList();


// XỬ LÝ XÓA CA
function deleteShift(index) {
    if (confirm("Bạn có chắc muốn xóa ca này?")) {
        shiftList.splice(index, 1);
        localStorage.setItem("shiftList", JSON.stringify(shiftList));
        renderShiftList();
    }
}


// XỬ LÝ SỬA CA
function editShift(index) {
    const item = shiftList[index];
    editIndex = index;

    document.getElementById("scheduleShift").value = item.ca;
    document.getElementById("scheduleDate").value = item.ngay;
    document.getElementById("shiftTimeText").textContent = item.gio;

    document.querySelector("#scheduleForm button").textContent = "Cập Nhật Ca";
}


// SUBMIT FORM: THÊM HOẶC CẬP NHẬT CA
document.getElementById("scheduleForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const ca = document.getElementById("scheduleShift").value;
    const ngay = document.getElementById("scheduleDate").value;
    const gio = document.getElementById("shiftTimeText").textContent;

    if (!ngay) {
        alert("Vui lòng chọn ngày!");
        return;
    }

    const newShift = { ca, ngay, gio };

    if (editIndex === -1) {
        shiftList.push(newShift);
        alert("Xếp ca thành công!");
    } else {
        shiftList[editIndex] = newShift;
        alert("Cập nhật ca thành công!");
        editIndex = -1;
        document.querySelector("#scheduleForm button").textContent = "Xếp Ca";
    }

    localStorage.setItem("shiftList", JSON.stringify(shiftList));

    renderShiftList();
});
