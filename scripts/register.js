"use strict";

///Click EVENT
btnSubmit.addEventListener("click", function () {
  //Hàm validate kiểm tra form hợp lệ
  function validateForm() {
    //Không có trường nào bị bỏ trống.
    if (!inputFirstName.value) {
      alert("Please input your First Name!");
      return false;
    }
    if (!inputLastName.value) {
      alert("Please input your Last Name!");
      return false;
    }
    if (!inputUserName.value) {
      alert("Please input your Username!");
      return false;
    }
    if (!inputPassWord.value) {
      alert("Please input your Password!");
      return false;
    }
    if (inputUserName.value) {
      //Username không được trùng với Username của các người dùng trước đó.
      for (let i = 0; i < userArr.length; i++) {
        if (inputUserName.value === userArr[i].userName) {
          alert("Username must be unique!");
          return false;
        }
      }
    }
    //Password phải có nhiều hơn 8 ký tự.
    if (inputPassWord.value.length < 8) {
      alert("Password need more than 8 characters!");
      return false;
    }
    //Password và Confirm Password phải giống nhau.
    if (inputPassWord.value !== inputPWConfirm.value) {
      alert("Password and confirm password does not match!");
      return false;
    }
    return true;
  }

  //Lấy dữ liệu nhập vào từ form
  if (validateForm()) {
    //Khởi tạo user mới với các dữ liệu hợp lệ - Dùng class User có sẵn
    const acc = new User(
      inputFirstName.value,
      inputLastName.value,
      inputUserName.value,
      inputPassWord.value
    );
    //Thêm user vào mảng, lưu mảng vào localStorage
    userArr.push(acc);
    saveToStorage("userArr", userArr);
    //Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});
