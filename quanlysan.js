// =========================
// POPUP FUNCTIONS
// =========================
function openPopup(id) {
    document.getElementById("popupOverlay").style.display = "block";
    document.getElementById(id).style.display = "block";
}
function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.querySelectorAll(".popup-box").forEach(p => p.style.display = "none");
}


// =========================
// RENDER LIST COURTS
// =========================
function renderCourts() {
    const list = document.getElementById("courtList");
    list.innerHTML = "";

    allCourts.forEach(court => {
        const item = document.createElement("div");
        item.className = "court-item";

        item.innerHTML = `
            <img src="${court.image}">
            <div class="court-name">${court.name}</div>
            <div class="court-info"><b>Loại sân:</b> ${court.type}</div>
            <div class="court-info"><b>Giờ mở:</b> ${court.open} - ${court.close}</div>
            <div class="court-info"><b>Số vé:</b> ${court.tickets}</div>
        `;

        list.appendChild(item);
    });
}
renderCourts();


// =========================
// BUTTON OPEN POPUP
// =========================
document.querySelector(".primary").onclick = () => openPopup("addPopup");
document.querySelector(".danger").onclick = () => {
    loadDeleteOptions();
    openPopup("deletePopup");
};
document.querySelector(".fix").onclick = () => {
    loadEditOptions();
    openPopup("editPopup");
};


// =========================
// ADD COURT
// =========================
document.getElementById("saveAdd").onclick = () => {
    const file = document.getElementById("addImage").files[0];
    if (!file) return alert("Vui lòng chọn ảnh!");

    const reader = new FileReader();
    reader.onload = function () {
        const newCourt = {
            name: document.getElementById("addName").value,
            type: document.getElementById("addType").value,
            open: document.getElementById("addOpen").value,
            close: document.getElementById("addClose").value,
            tickets: document.getElementById("addTickets").value,
            image: reader.result
        };

        allCourts.push(newCourt);
        renderCourts();
        closePopup();
    };
    reader.readAsDataURL(file);
};


// =========================
// DELETE COURT
// =========================
function loadDeleteOptions() {
    const select = document.getElementById("deleteSelect");
    select.innerHTML = "";
    allCourts.forEach((c, i) => {
        select.innerHTML += `<option value="${i}">${c.name}</option>`;
    });
}

document.getElementById("confirmDelete").onclick = () => {
    const index = document.getElementById("deleteSelect").value;
    allCourts.splice(index, 1);
    renderCourts();
    closePopup();
};


// =========================
// EDIT COURT
// =========================
function loadEditOptions() {
    const select = document.getElementById("editSelect");
    select.innerHTML = "";
    allCourts.forEach((c, i) => {
        select.innerHTML += `<option value="${i}">${c.name}</option>`;
    });

    if (allCourts.length > 0) loadCourtToEdit(0);
}

document.getElementById("editSelect").onchange = function () {
    loadCourtToEdit(this.value);
};

function loadCourtToEdit(index) {
    const c = allCourts[index];
    document.getElementById("editName").value = c.name;
    document.getElementById("editType").value = c.type;
    document.getElementById("editOpen").value = c.open;
    document.getElementById("editClose").value = c.close;
    document.getElementById("editTickets").value = c.tickets;
}

document.getElementById("saveEdit").onclick = () => {
    const idx = document.getElementById("editSelect").value;
    const court = allCourts[idx];

    court.name = document.getElementById("editName").value;
    court.type = document.getElementById("editType").value;
    court.open = document.getElementById("editOpen").value;
    court.close = document.getElementById("editClose").value;
    court.tickets = document.getElementById("editTickets").value;

    const file = document.getElementById("editImage").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            court.image = reader.result;
            renderCourts();
            closePopup();
        };
        reader.readAsDataURL(file);
    } else {
        renderCourts();
        closePopup();
    }
};
