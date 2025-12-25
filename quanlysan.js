// =========================================================
// FILE: quanlysan.js (Phiên bản ĐÃ SỬA LỖI LOCAL STORAGE)
// =========================================================

// Khởi tạo/Lấy dữ liệu sân. allCourtsData phải là mảng dữ liệu hiện tại
// Lưu ý: Biến 'allCourts' phải được định nghĩa đâu đó trong HTML hoặc file JS khác
// Nếu không có, ta coi nó là mảng rỗng và sẽ được nạp sau.
const COURTS_STORAGE_KEY = 'appCourtsData'; 

// Giả định: Danh sách 25 sân cố định nằm trong biến 'allCourts' (được load trước)
// Nếu không, hãy tạo một biến COURTS_DATA_DEFAULT và đưa 25 sân vào đây.
let initialDefaultCourts = typeof allCourts !== 'undefined' && Array.isArray(allCourts) ? allCourts : [];
let allCourtsData = initialDefaultCourts; // Khởi tạo với dữ liệu mặc định

document.addEventListener('DOMContentLoaded', function() {

    let currentEditId = null; // Biến lưu ID sân đang chỉnh sửa (nếu có)
    const addCourtModal = document.getElementById('addCourtModal');
    const closeAddCourtModal = document.getElementById('closeAddCourtModal');

    // === 1. HÀM LƯU DỮ LIỆU VÀO LOCAL STORAGE (ĐÃ SỬA) ===
    function saveCourtsToLocalStorage() {
        // LỖI ĐÃ SỬA: Lưu toàn bộ mảng dữ liệu hiện tại (allCourtsData) vào key thống nhất
        localStorage.setItem(COURTS_STORAGE_KEY, JSON.stringify(allCourtsData));
    }

    // === 2. Tải và đồng bộ dữ liệu sân (bao gồm cả dữ liệu từ Local Storage) (ĐÃ SỬA) ===
    function loadAndSyncCourts() {
        const storedCourtsJson = localStorage.getItem(COURTS_STORAGE_KEY);
        
        if (storedCourtsJson) {
            try {
                // LỖI ĐÃ SỬA: Đọc từ key thống nhất: COURTS_STORAGE_KEY ('appCourtsData')
                const storedCourts = JSON.parse(storedCourtsJson);
                
                if (Array.isArray(storedCourts)) {
                    // Ưu tiên dữ liệu đã lưu
                    allCourtsData = storedCourts;
                } else {
                    // Nếu lỗi parse, dùng dữ liệu gốc và lưu lại
                    saveCourtsToLocalStorage();
                }
            } catch (e) {
                console.error("Lỗi khi phân tích Local Storage. Sử dụng dữ liệu gốc.", e);
                allCourtsData = initialDefaultCourts; 
                saveCourtsToLocalStorage(); // Lưu dữ liệu gốc vào key mới
            }
        } else if (initialDefaultCourts.length > 0) {
            // Lần đầu tiên chạy hoặc Local Storage trống -> Lưu dữ liệu gốc vào key thống nhất
            allCourtsData = initialDefaultCourts; 
            saveCourtsToLocalStorage();
        } else {
             // Không có Local Storage và không có dữ liệu gốc
             allCourtsData = [];
        }
    }
    loadAndSyncCourts();
    
    // === 3. HÀM HỖ TRỢ CHO MODAL VÀ FORM ===

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
            // Lưu ý: Cần thêm trường monthPrice vào form nếu bạn muốn sửa giá tháng
            document.getElementById('courtPrice').value = courtToEdit.price || ''; 
            
            document.getElementById('updateCourtBtn').textContent = 'Cập Nhật Sân';
            
            addCourtModal.style.display = 'block';
        }
    }
    
    // Hàm Reset Form khi đóng Modal hoặc chuẩn bị Thêm mới
    function resetModalForAdd() {
        currentEditId = null;
        document.getElementById('addCourtForm')?.reset(); 
        document.querySelector('#addCourtModal h2').textContent = 'Thêm Sân Cầu Lông Mới';
        document.getElementById('updateCourtBtn').textContent = 'Thêm & Cập Nhật'; // Đổi tên nút cho rõ ràng hơn
    }


    // === 4. XỬ LÝ FORM THÊM/SỬA SÂN ===
    
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
            // monthPrice: Giả định bạn đã thêm input cho giá tháng nếu cần sửa
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
            currentEditId = null; 

        } else {
            // Trường hợp 2: THÊM MỚI (Add)
            // Đảm bảo ID không trùng lặp và tăng dần
            const maxId = allCourtsData.length > 0 ? Math.max(...allCourtsData.map(c => c.id)) : 0;
            const newId = maxId + 1;
            
            const newCourt = { id: newId, ...courtDetails };
            allCourtsData.push(newCourt);
            actionMessage = `Đã thêm sân "${newCourt.name}" thành công!`;
        }

        // LỖI ĐÃ SỬA: Lưu dữ liệu vào Local Storage (Đồng bộ)
        saveCourtsToLocalStorage();
        
        // Cập nhật giao diện
        renderCourts();
        
        // Đóng Modal và thông báo
        addCourtModal.style.display = 'none';
        alert(actionMessage);

        // Reset form và trạng thái
        resetModalForAdd();
    });

    // === 5. LOGIC HIỂN THỊ DANH SÁCH SÂN (renderCourts giữ nguyên) ===

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
    
    // === 6. LOGIC XỬ LÝ TẤT CẢ CÁC NÚT ĐIỀU KHIỂN (attachCourtActionListeners giữ nguyên) ===
    
    function attachCourtActionListeners() {
        
        // Xử lý nút Quay lại (Back Button)
        document.getElementById('backButton')?.addEventListener('click', () => history.back());
        
        // Xử lý nút Chỉnh sửa thông tin
        document.getElementById('editInfoButton')?.addEventListener('click', () => alert('Mở pop-up Chỉnh sửa thông tin...'));

        // Xử lý nút Sửa (mini)
        document.querySelectorAll('.edit-court-btn').forEach(button => {
            button.addEventListener('click', function() {
                const courtId = Number(this.getAttribute('data-id'));
                loadCourtForEdit(courtId);
            });
        });
        
       // Xử lý nút Xóa (mini) — CÓ RÀNG BUỘC BOOKING
document.querySelectorAll('.delete-court-btn').forEach(button => {
    button.addEventListener('click', function() {
        const courtId = Number(this.getAttribute('data-id'));

        // ===== RÀNG BUỘC: KIỂM TRA BOOKING =====
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

        let isCourtBooked = bookings.some(b => b.courtId === courtId);

        if (isCourtBooked) {
            alert(`❌ Không thể xóa sân ID ${courtId} vì sân đã có người đặt.`);
            return;
        }
        // ===== HẾT RÀNG BUỘC =====

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

        
        // Xử lý nút Thêm (lớn)
        document.querySelector('.action-button.primary')?.addEventListener('click', function() {
            resetModalForAdd(); 
            addCourtModal.style.display = 'block';
        });

        // Đóng Modal (Nút X)
        closeAddCourtModal?.addEventListener('click', function() {
            addCourtModal.style.display = 'none';
            resetModalForAdd();
        });

        // Đóng Modal (Click ra ngoài)
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
