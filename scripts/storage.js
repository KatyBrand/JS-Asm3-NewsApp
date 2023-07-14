"use strict";
//DOM Element cho phần NEWS và SEARCH NEWS
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");

//DU lieu co san - Để Test
const acc1 = new User("Katy", "Brand", "katy128", "1111");
const acc2 = new User("Donald", "Trump", "donald-mai-dinh", "2222");

//Nếu userArr trống thì lấy dữ liệu có sẵn bên trên
if (!getFromStorage("userArr")) {
  saveToStorage("userArr", [acc1, acc2]);
}
//Chuyển đổi đối tượng khi lấy từ LStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//Chuyển đổi đối tượng thành string khi lưu vào LStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const userArr = getFromStorage("userArr");

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
const taskTest1 = new Task("Hang out", "katy128", false);
const taskTest2 = new Task("Drink Beer", "donald-mai-dinh", true);

if (!getFromStorage("todoArr")) {
  saveToStorage("todoArr", [taskTest1, taskTest2]);
}
//Chuyển đổi đối tượng khi lấy từ LStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//Chuyển đổi đối tượng thành string khi lưu vào LStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
const todoArr = getFromStorage("todoArr");
