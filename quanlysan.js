// Lấy danh sách sân từ file data_courts.js
// allCourts được import từ file đó

function renderCourts() {
    const list = document.getElementById("courtList");
    list.innerHTML = "";

    allCourts.forEach(court => {
        const item = document.createElement("div");
        item.className = "court-item";

        item.innerHTML = `
            <img src="${court.image}" alt="${court.name}">
            <div class="court-name">${court.name}</div>
            <div class="court-info"><b>Loại sân:</b> ${court.type}</div>
            <div class="court-info"><b>Quận:</b> ${court.district}</div>
            <div class="court-info"><b>Mở cửa:</b> ${court.open} - ${court.close}</div>
            <div class="court-info"><b>Số lượng sân:</b> ${court.tickets}</div>
        `;

        list.appendChild(item);
    });
}

renderCourts();
