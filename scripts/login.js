"use strict";

//Event khi ấn vào Submit
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  //Validate dữ liệu hợp lệ
  function validateForm() {
    // - Không có trường nào bị bỏ trống.
    if (!inputUserName.value) {
      alert("Please input your Username!");
      return false;
    }
    if (!inputPassWord.value) {
      alert("Please input your Password!");
      return false;
    }
    return true;
  }
  //Khi user nhập đủ các trường
  if (validateForm()) {
    //Tìm userNam trong userArr
    currentUser = userArr.find((user) => user.userName === inputUserName.value);
    //Nếu user không tồn tại
    if (!currentUser) {
      alert("Username is wrong!");
    }
    //Kiểm tra xem password đúng chưa
    if (currentUser.password === inputPassWord.value) {
      //Nếu đúng - lưu lại user là user hiện tại (currentUser)
      saveToStorage("currentUser", currentUser);
      //Về lại trang chủ
      window.location.href = "../index.html";
    } else {
      //Nếu sai, hiện thông báo password sai
      alert("Password is wrong!");
    }
  }
});
