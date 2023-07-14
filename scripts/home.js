"use strict";
//Dom Element
const loginModal = document.getElementById("login-modal");
const welcomeMes = document.getElementById("welcome-message");

//Lấy thông tin người dùng hiện tại từ localStorage
currentUser = getFromStorage("currentUser");
//Nếu người dùng chưa đăng nhập, hiển thị như mặc định
//Nếu người dùng đã đăng nhập:
if (currentUser) {
  //Ẩn div đăng nhập
  loginModal.style.display = "none";
  //Hiện thông báo chào mừng
  welcomeMes.textContent = `Welcome, ${currentUser.firstName}!`;
}
//Event khi ấn Log Out
btnLogOut.addEventListener("click", function () {
  //Xoa curentUser khi log out
  localStorage.removeItem("currentUser");
  currentUser = "";
  //Hiện lại bảng đăng nhập như cũ
  loginModal.style.display = "block";
  //Xóa thông điệp chào mừng
  welcomeMes.textContent = "";
});
