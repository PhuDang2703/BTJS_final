function Validation() {
    this.checkEmty = function (validate, errorID, mess) {
        if (validate === "") {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        } else {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }
    }

    this.checkLength = function (validate, errorID, mess, min, max) {
        if (min <= validate.trim().length && validate.trim().length <= max) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }

        getEle(errorID).innerHTML = mess;
        getEle(errorID).style.display = "block";
        return false;
    }

    this.checkChuoiKiTu = function (validate, errorID, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (validate.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }

    this.checkEmail = function (validate, errorID, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (validate.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }

    this.checkPassword = function(validate, errorID, mess){
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
        if(validate.match(pass)){
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }else{
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }

    this.checkluongCB = function(validate, errorID, mess){
        if(validate >=1000000 && validate <=20000000){
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }else{
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }

    this.checkChonChucVu = function (idSelect, errorID, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }

        getEle(errorID).innerHTML = mess;
        getEle(errorID).style.display = "block";
        return false;
    }

    

}

