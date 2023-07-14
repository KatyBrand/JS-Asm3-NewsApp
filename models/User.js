"use strict";
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const inputPWConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
const btnLogOut = document.getElementById("btn-logout");
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");

//Tạo Class User
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    //Mặc định cho phần news khi người dùng chưa đổi setting
    this.category = "General";
    this.pageSize = 10;
  }
}
let currentUser;
