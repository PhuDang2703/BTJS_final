// Global
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();


//Lấy thông tin nhân viên 

function getEle(id) {
    return document.getElementById(id);
}
function layThongTinNV() {
    //Lấy thông tin từ user nhập
    var taiKhoan = getEle("tknv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLamTrongThang = getEle("gioLam").value;

    //flag: cờ hiệu
    var isValid = true; //hợp lệ

    //Check validation
    //Tài khoản
    isValid &= validation.checkEmty(taiKhoan, 'errorTaiKhoan', "(*) Vui lòng nhập tài khoản") &&
    validation.checkLength(taiKhoan, 'errorTaiKhoan', "(*) Vui lòng nhập từ 4 đến 6 ký số", 4, 6);

    //Tên nv
    isValid &= validation.checkEmty(tenNV, 'errorName', "(*) Vui lòng nhập tên") &&
    validation.checkChuoiKiTu(tenNV, 'errorName', "(*) Vui lòng nhập tên dạng chữ");

    //Email
    isValid &= validation.checkEmty(email, 'errorEmail', "(*) Vui lòng nhập email") &&
    validation.checkEmail(email, 'errorEmail', "(*) Vui lòng nhập email đúng định dạng");

    //Mật khẩu
    isValid &= validation.checkEmty(matKhau, 'errorPassword', "(*) Vui lòng nhập mật khẩu") &&
    validation.checkPassword(matKhau, 'errorPassword', "(*) Vui lòng nhập đúng định dạng mật khẩu") &&
    validation.checkLength(matKhau, 'errorPassword', "(*) Vui lòng nhập mật khẩu 6-10 kí tự", 6, 10);

    //Lương cơ bản
    isValid &= validation.checkEmty(luongCoBan, 'errorLuongCB', "(*) Vui lòng nhập lương cơ bản") &&
    validation.checkluongCB(luongCoBan, 'errorLuongCB', "(*) Vui lòng nhập lương cơ bản từ 1-20 triệu");

    //Chức vụ
    isValid &=  validation.checkChonChucVu('chucvu', "errorChucVu", "(*) Vui lòng chọn chức vụ");

    //Giờ làm trong tháng
    isValid &= validation.checkEmty(gioLamTrongThang, 'errorGioLam', "(*) Vui lòng nhập số giờ làm");
    

    if (!isValid) return;

    //Tạo đối tượng từ lớp đối tượng nhân viên
    var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang);

    //Tính lương
    nv.tinhTongLuong();
    //Xếp loại nhân viên
    nv.xepLoaiNV();

    return nv;
}

//Button Thêm nhân viên
getEle("btnThemNV").onclick = function () {
    var nv = layThongTinNV();

    if (nv) {
        dsnv.themNV(nv);
        //Render danh sách nhân viên ra UI
        renderTable(dsnv.arr);

        setLocalStorage();
    }
}

function renderTable(data) {
    var content = "";
    for (i = 0; i < data.length; i++) {
        var nhanVien = data[i];
        content += `
        <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.tenNV}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.loaiNV}</td>
        <td> 
        <button class = "btn btn-info" data-toggle="modal" data-target="#myModal" onclick = "editSV('${nhanVien.taiKhoan}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteNV('${nhanVien.taiKhoan}')">Delete
        </button> 
        </td>
        </tr>
        `;
        //Hoặc dùng bthg 
        // content += "<tr>";
        // content += "<td>" + nhanVien.taiKhoan +" </td>";
        // content += "</tr>";
    }
    getEle("tableDanhSach").innerHTML = content;
}

//Delete nhân viên
function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    //Lưu lại storage mỗi khi xóa
    setLocalStorage();
};

//Edit nhân viên
function editSV(taiKhoan) {
    var nv = dsnv.layChiTietNV(taiKhoan);
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("name").value = nv.tenNV;
        getEle("email").value = nv.email;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLamTrongThang;
    }
}

//Cập nhật nhân viên
getEle('btnCapNhat').addEventListener('click', function () {
    var nv = layThongTinNV();
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
})

//Tìm kiếm nhân viên bằng ô search
getEle('btnTimNV').addEventListener('click', function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timNV(keyword);
    renderTable(mangTimKiem);
})


function setLocalStorage() {
    //Convert JSON sang string
    var dataString = JSON.stringify(dsnv.arr);
    //Lưu data xuống localstorage
    localStorage.setItem("DSNV", dataString);
}
//Lấy ra data đã lưu từ localstorage mỗi khi load lại trang
function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //Convert string sang JSON
        dsnv.arr = JSON.parse(dataString);
        //Render lại ra table
        renderTable(dsnv.arr);
    }
}
