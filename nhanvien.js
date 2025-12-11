// Đọc dữ liệu từ localStorage
let shiftList = JSON.parse(localStorage.getItem("shiftList")) || [];

// Vị trí để render
const tbody = document.getElementById("employeeShiftList");

tbody.innerHTML = "";

// Nếu chưa có ca nào
if (shiftList.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="3" style="text-align:center; padding:10px;">
                Chưa có ca làm việc nào
            </td>
        </tr>
    `;
}

// Render dữ liệu
shiftList.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.ngay}</td>
        <td>${item.ca}</td>
        <td>${item.gio}</td>
    `;
    tbody.appendChild(tr);
});
