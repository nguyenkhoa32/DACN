
// =========================================================
// FILE: quanlysan.js (Hoàn thiện Logic Thêm, Xóa và Sửa Sân)
// =========================================================

// Khởi tạo/Lấy dữ liệu sân. allCourts phải là biến toàn cục
let allCourtsData = typeof allCourts !== 'undefined' ? allCourts : [];

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

document.addEventListener('DOMContentLoaded', function() {

 HEAD
    let currentEditId = null; // Biến lưu ID sân đang chỉnh sửa (nếu có)
    const addCourtModal = document.getElementById('addCourtModal');
    const closeAddCourtModal = document.getElementById('closeAddCourtModal');

        item.innerHTML = `
            <img src="${court.image}">
            <div class="court-name">${court.name}</div>
            <div class="court-info"><b>Loại sân:</b> ${court.type}</div>
            <div class="court-info"><b>Giờ mở:</b> ${court.open} - ${court.close}</div>
            <div class="court-info"><b>Số vé:</b> ${court.tickets}</div>
        `;


    // Hàm lưu toàn bộ mảng dữ liệu hiện tại vào Local Storage
    function saveCourtsToLocalStorage() {
        localStorage.setItem('customCourts', JSON.stringify(allCourtsData));
    }

    // === 1. Tải và đồng bộ dữ liệu sân (bao gồm cả dữ liệu từ Local Storage) ===
    function loadAndSyncCourts() {
        const storedCourts = localStorage.getItem('customCourts');
        
        if (storedCourts) {
            try {
                // Ghi đè dữ liệu gốc bằng dữ liệu đã lưu trong Local Storage
                allCourtsData = JSON.parse(storedCourts);
            } catch (e) {
                console.error("Lỗi khi phân tích Local Storage, sử dụng dữ liệu gốc:", e);
            }
        }
        
        if (!Array.isArray(allCourtsData)) {
             allCourtsData = [];
        }
    }
    loadAndSyncCourts();
    
    // === 2. HÀM HỖ TRỢ CHO MODAL VÀ FORM ===

    // Hàm điền thông tin sân vào Form Modal (Chức năng Sửa)
    function loadCourtForEdit(courtId) {
        const courtToEdit = allCourtsData.find(court => court.id === courtId);
        
        if (courtToEdit) {
            currentEditId = courtId;
            
            document.querySelector('#addCourtModal h2').textContent = `Chỉnh Sửa Sân: ${courtToEdit.name}`;
            document.getElementById('courtName').value = courtToEdit.name;
            document.getElementById('courtType').value = courtToEdit.type;
            document.getElementById('courtDistrict').value = courtToEdit.district;
            document.getElementById('courtOpen').value = courtToEdit.open;
            document.getElementById('courtClose').value = courtToEdit.close;
            document.getElementById('courtTickets').value = courtToEdit.tickets;
            document.getElementById('courtImage').value = courtToEdit.image;
            document.getElementById('courtPrice').value = courtToEdit.price || ''; 
            
            document.getElementById('updateCourtBtn').textContent = 'Cập Nhật Sân';
            
            addCourtModal.style.display = 'block';
        }
    }
    
    // Hàm Reset Form khi đóng Modal hoặc chuẩn bị Thêm mới
    function resetModalForAdd() {
        currentEditId = null;
        // Sử dụng ?.reset() để tránh lỗi nếu form chưa load kịp
        document.getElementById('addCourtForm')?.reset(); 
        document.querySelector('#addCourtModal h2').textContent = 'Thêm Sân Cầu Lông Mới';
        document.getElementById('updateCourtBtn').textContent = 'Cập Nhật & Hiển Thị';
    }


    // === 3. XỬ LÝ FORM THÊM/SỬA SÂN ===
    
    document.getElementById('addCourtForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const courtDetails = {
            name: document.getElementById('courtName').value,
            type: document.getElementById('courtType').value,
            district: document.getElementById('courtDistrict').value,
            open: document.getElementById('courtOpen').value,
            close: document.getElementById('courtClose').value,
            tickets: parseInt(document.getElementById('courtTickets').value),
            image: document.getElementById('courtImage').value || 'img/default.png',
            price: document.getElementById('courtPrice').value, 
        };
        
        let actionMessage = "";

        if (currentEditId) {
            // Trường hợp 1: CHỈNH SỬA (Edit)
            const index = allCourtsData.findIndex(court => court.id === currentEditId);
            if (index !== -1) {
                // Sử dụng spread syntax để hợp nhất thông tin
                allCourtsData[index] = { ...allCourtsData[index], ...courtDetails };
                actionMessage = `Đã cập nhật sân ID: ${currentEditId} thành công!`;
            }
            // Reset ID sau khi sửa xong
            currentEditId = null; 

        } else {
            // Trường hợp 2: THÊM MỚI (Add)
            const newId = allCourtsData.length > 0 ? Math.max(...allCourtsData.map(c => c.id)) + 1 : 1;
            const newCourt = { id: newId, ...courtDetails };
            allCourtsData.push(newCourt);
            actionMessage = `Đã thêm sân "${newCourt.name}" thành công!`;
        }

        // Lưu dữ liệu vào Local Storage (Đồng bộ)
        saveCourtsToLocalStorage();
        
        // Cập nhật giao diện
        renderCourts();
        
        // Đóng Modal và thông báo
        addCourtModal.style.display = 'none';
        alert(actionMessage);

        // Reset form và trạng thái
        resetModalForAdd();
    });


    // === 4. LOGIC HIỂN THỊ DANH SÁCH SÂN ===

    function renderCourts() {
        const list = document.getElementById("courtList");
        
        if (!allCourtsData || !Array.isArray(allCourtsData) || allCourtsData.length === 0) {
            list.innerHTML = "<p style='text-align:center; color:gray; font-weight:bold;'>Chưa có sân nào được thêm.</p>";
            return;
        }

        list.innerHTML = "";

        allCourtsData.forEach(court => {
            const item = document.createElement("div");
            item.className = "court-item";
            item.setAttribute('data-court-id', court.id); 

            item.innerHTML = `
                <img src="${court.image}" alt="${court.name}">
                <div class="court-name">${court.name}</div>
                <div class="court-info"><b>Loại sân:</b> ${court.type}</div>
                <div class="court-info"><b>Quận:</b> ${court.district}</div>
                <div class="court-info"><b>Mở cửa:</b> ${court.open} - ${court.close}</div>
                <div class="court-info"><b>Số lượng vé:</b> ${court.tickets}</div>
                
                <div class="court-actions-mini">
                    <button class="mini-action-btn edit-court-btn" data-id="${court.id}">Sửa</button>
                    <button class="mini-action-btn delete-court-btn" data-id="${court.id}">Xóa</button>
                </div>
            `;

            list.appendChild(item);
        });
        
        // Gán lại sự kiện cho các nút Sửa/Xóa sau khi render
        attachCourtActionListeners(); 
    }
    
    // === 5. LOGIC XỬ LÝ TẤT CẢ CÁC NÚT ĐIỀU KHIỂN ===
    
    function attachCourtActionListeners() {
        
        // Xử lý nút Quay lại (Back Button)
        document.getElementById('backButton')?.addEventListener('click', () => history.back());
        
        // Xử lý nút Chỉnh sửa thông tin
        document.getElementById('editInfoButton')?.addEventListener('click', () => alert('Mở pop-up Chỉnh sửa thông tin...'));

        // Xử lý nút Sửa (mini) - Đã tích hợp logic gọi loadCourtForEdit
        document.querySelectorAll('.edit-court-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courtId = Number(this.getAttribute('data-id'));
                loadCourtForEdit(courtId);
            });
        });
        
        // Xử lý nút Xóa (mini) - Đã tích hợp logic xóa và đồng bộ
        document.querySelectorAll('.delete-court-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courtId = Number(this.getAttribute('data-id')); 
                
                if (confirm(`Bạn có chắc chắn muốn XÓA sân ID: ${courtId} không? Hành động này sẽ cập nhật cả giao diện khách hàng!`)) {
                    
                    const initialLength = allCourtsData.length;
                    
                    // Lọc và loại bỏ sân khỏi mảng dữ liệu
                    allCourtsData = allCourtsData.filter(court => court.id !== courtId);
                    
                    if (allCourtsData.length < initialLength) {
                        saveCourtsToLocalStorage();
                        renderCourts();
                        alert(`Đã xóa thành công sân ID: ${courtId}.`);
                    } else {
                        alert(`Lỗi: Không tìm thấy sân ID: ${courtId} để xóa.`);
                    }
                }
            });
        });
        
        // Xử lý nút Thêm (lớn) - Gọi reset form trước khi mở Modal
        document.querySelector('.action-button.primary')?.addEventListener('click', function() {
            resetModalForAdd(); 
            addCourtModal.style.display = 'block';
        });

        // Đóng Modal (Nút X) - Gọi reset trạng thái
        closeAddCourtModal?.addEventListener('click', function() {
            addCourtModal.style.display = 'none';
            resetModalForAdd();
        });

        // Đóng Modal (Click ra ngoài) - Gọi reset trạng thái
        window.onclick = function(event) {
            if (event.target == addCourtModal) {
                addCourtModal.style.display = 'none';
                resetModalForAdd();
            }
        };
        
        // Xử lý nút Xóa (lớn)
        document.querySelector('.action-button.danger')?.addEventListener('click', function() {
            alert('Chức năng Xóa hàng loạt đang được phát triển.');
        });
        
        // Xử lý nút Sửa (lớn)
        document.querySelector('.action-button.fix')?.addEventListener('click', function() {
            alert('Chức năng Sửa hàng loạt đang được phát triển.');
        });
    }

    // Chạy hàm hiển thị sân khi trang được tải
    renderCourts();
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

