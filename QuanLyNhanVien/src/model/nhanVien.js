//Object nhân viên
function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLamTrongThang){
    //Property
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLamTrongThang = _gioLamTrongThang;
    this.tongLuong = 0;
    this.loaiNV = "";

    //Method
    //1. Tính lương
    this.tinhTongLuong = function(){
        if(this.chucVu === "Sếp"){
            this.tongLuong = parseFloat(this.luongCoBan)*3;
        }else if(this.chucVu === "Trưởng phòng"){
            this.tongLuong = parseFloat(this.luongCoBan)*2;
        }else{
            this.tongLuong = parseFloat(this.luongCoBan);
        }
    }

    //2. Xếp loại nhân viên
    this.xepLoaiNV = function(){
        if(this.gioLamTrongThang>=192){
            this.loaiNV = "Nhân viên xuất sắc";
        }else if(this.gioLamTrongThang>=176){
            this.loaiNV = "Nhân viên giỏi";
        }else if(this.gioLamTrongThang>=160){
            this.loaiNV = "Nhân viên khá";
        }else{
            this.loaiNV = "Nhân viên trung bình";
        }
    }
}