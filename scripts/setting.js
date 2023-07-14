"use strict";
//Lay du lieu currentUser
currentUser = getFromStorage("currentUser");
//Event khi ấn Submit
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    //Lưu key mới vào object currentUser - với Value là trường nhập vào
    currentUser.pageSize = Number(inputPageSize.value);
    currentUser.category = inputCategory.value;
    //Lưu currentUser local Storage
    saveToStorage("currentUser", currentUser);
    //Update cài đặt trong userArr
    //Tìm index của currentUser trong userArr
    let index;
    userArr.forEach((e, i) => {
      if (e.userName === currentUser.userName) {
        index = i;
      }
    });
    //Update dữ liệu
    userArr[index] = currentUser;
    //Lưu userArr mới vào Local Storage
    saveToStorage("userArr", userArr);
    //Clear input
    inputPageSize.value = "";
    inputCategory.value = "General";
    //Thông báo tới người dùng
    alert("New setting saved successfully!");
  }
});
//Validate trường đầu vào
const validate = function () {
  if (!inputPageSize.value) {
    alert("Please input news per page!");
    return false;
  } else if (inputPageSize.value <= 0 || inputPageSize.value > 100) {
    alert("News per page must be between 1 and 100!");
    return false;
  }
  return true;
};
