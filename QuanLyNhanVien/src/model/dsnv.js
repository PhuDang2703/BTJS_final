function DanhSachNhanVien() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    }

    this.timViTriNV = function (taiKhoan) {
        //Tìm kiếm nhân viên để xóa, cập nhật hoặc sửa thông tin
        /**
     * Tim vi tri
     * 0. Tao bien index gan -1 (khong tim thay)
     * 1. Duyệt mảng
     *      => nv = arr[i]
     * 2. Nếu nv.taiKhoan trùng với taiKhoan
     *      => true => gán i cho biến index
     */
        var index = -1;
        for (i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    }

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }

    this.layChiTietNV = function(taiKhoan){
        var index = this.timViTriNV(taiKhoan);
        if(index !== -1){
            return this.arr[index];
        }
    }
    this.capNhatNV = function (nv) { 
        //Tìm vị trí nv cần update
        var index = this.timViTriNV(nv.taiKhoan);
        if(index !== -1){
            this.arr[index] = nv;
        }
    }

    this.timNV = function (keyword) {
        /**
     * 0. tạo mangTimKiem = []
     * 1. Duyệt mảng arr
     *      => nv = arr[i]
     * 2. Nếu nv.xepLoaiNV() trùng với keyword
     *      => true => push nv vào mangTimKiem
     * 3. trả về mangTimKiem
     */
    var mangTimKiem = [];
    for(i = 0; i < this.arr.length; i++){
        var nv = this.arr[i];
        //chuyển xếp loại nv về chữ thường
        var xlNVLowerCase = nv.loaiNV.toLowerCase();
        var keywordLowerCase = keyword.toLowerCase();
        if(xlNVLowerCase.indexOf(keywordLowerCase) !==-1){
            mangTimKiem.push(nv);
        }
    }

    return mangTimKiem;
    }
}