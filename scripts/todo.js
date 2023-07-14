"use strict";
const inputTask = document.getElementById("input-task");
const taskContainer = document.getElementById("todo-list");
const btnAddTask = document.getElementById("btn-add");
//Người dùng hiện tại
currentUser = getFromStorage("currentUser");
getFromStorage("todoArr", todoArr);
//
//Nếu user chưa log in:
if (!currentUser) alert("You need to log in to add new task!");
let html;
//Hiện task theo data
const renderTask = function (data) {
  if (data.isDone) {
    html = `<li class="checked" onclick ="toogleTask('${data.task}')">${data.task}<span onclick='deleteTask("${data.task}")' class="close">x</span></li>`;
    taskContainer.insertAdjacentHTML("beforeend", html);
  } else {
    html = `<li onclick ="toogleTask('${data.task}')">${data.task}<span onclick='deleteTask("${data.task}")'class="close">x</span></li>`;
    taskContainer.insertAdjacentHTML("beforeend", html);
  }
  //Tránh event bubbling khi click vào thẻ span
  document.querySelectorAll(".close").forEach((t) => {
    t.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });
};
//Stop Bubbling
//Hàm xóa Task
const deleteTask = function (taskContent) {
  if (confirm("Are you sure?")) {
    //Tìm index của Task cần xóa trong todoArr
    let index;
    todoArr.forEach((e, i) => {
      if (e.owner === currentUser.userName && e.task === taskContent) {
        index = i;
      }
    });
    //Xóa Task tìm được
    todoArr.splice(index, 1);
    //Lưu dữ liệu mới vào localStorage
    saveToStorage("todoArr", todoArr);
    //Update Task của user hiện tại
    curUserTask = todoArr.filter((u) => u.owner == currentUser.userName);
    //Xóa html
    taskContainer.innerHTML = "";
    //Render dữ liệu sau khi update
    curUserTask.forEach((t) => renderTask(t));
  }
};

//Hiện task của người dùng hiện tại
let curUserTask = todoArr.filter((u) => u.owner == currentUser.userName);
curUserTask.forEach((t) => renderTask(t));
//Hàm khi ấn vào task (để đổi trạng thái làm hay chưa)
const toogleTask = function (taskContent) {
  //Tìm object task tương ứng theo nội dung task
  //ABC - ABC
  let task = curUserTask.find((t) => t.task === taskContent);
  //Switch Boolean - Đổi đã làm thành chưa làm và ngược lại
  task.isDone = !task.isDone;
  //Xoa html cu
  taskContainer.innerHTML = "";
  //Render lại HTML và Update data mới vào Local Storage
  curUserTask.forEach(function (e) {
    //render lại HTML với dữ liệu mới
    renderTask(e);
    todoArr.forEach((p, i) => {
      if (p.task === e.task && p.owner === e.owner) {
        //Update dữ liệu mới khi trùng nội dung task và owner
        todoArr[i] = e;
      }
    });
  });
  //Lưu dữ liệu mới vào localStorage
  saveToStorage("todoArr", todoArr);
};
//Event khi ấn btn Add Task
btnAddTask.addEventListener("click", function () {
  //Tạo biến data lưu dữ liệu vừa nhập
  const data = new Task(inputTask.value, currentUser.userName, false);
  //Lưu dữ liệu vào todoArr
  todoArr.push(data);
  //Lưu dữ liệu vào current User task
  curUserTask.push(data);
  //Render HTML hiện dữ liệu đã nhập
  renderTask(data);
  //Lưu vào local Storage
  saveToStorage("todoArr", todoArr);
});
