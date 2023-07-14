"use strict";

//Lấy data người dùng hiện tại
currentUser = getFromStorage("currentUser");
//Ẩn nút previous từ đầu
btnPrev.style.display = "none";
//
//Fetch API
const getNews = async function (category, pageSize, page) {
  //Tạo hàm chạy trong bất đồng bộ - async return Promise
  try {
    const res = await fetch(
      //Chờ Promis hoàn thành để lưu giá trị vô biến
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=9489d529da8d414aa425093c6a952f9b`
    );
    const data = await res.json();
    //Parse
    if (data.code === "rateLimited" || data.status === "error") {
      throw new Error(data.message);
    }
    renderData(data);
  } catch (err) {
    console.log(err.message);
  }
};
//Biến chứa số trang tối đa
let maxPage;

//Render dữ liệu Promise trả về
const renderData = function (data) {
  const renderNews = function (article) {
    //HTML - Nếu news ko có hình ảnh, hiện hình ảnh mặc định
    const html = `<div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                <img
                    src="${
                      article.urlToImage ? article.urlToImage : "news.jpg"
                    }"
                    class="card-img"
                    alt="${article.description}"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      ${article.description}
                    </h5>
                    <p class="card-text">
                      ${article.content}
                    </p>
                    <a href="${article.url}"class="btn btn-primary">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    newsContainer.insertAdjacentHTML("beforeend", html);
  };
  //Lặp qua data để chèn từng news 1
  if (data.articles) {
    for (let i = 0; i < data.articles.length; i++) {
      renderNews(data.articles[i]);
    }
  }
  //Nếu chưa đăng nhập, số trang tối đa bằng tổng số news chia 10, làm tròn
  //Nếu đã đăng nhập, số trang tối đa được tính dựa theo pageSize người dùng cài đặt
  if (!currentUser) {
    maxPage = (data.totalResults / 10).toFixed();
    //Trường hợp số news ít hơn số lượng bài viết/trang, ẩn nút next
    if (data.totalResults <= 10) {
      btnNext.style.display = "none";
    }
  } else {
    maxPage = (data.totalResults / currentUser.pageSize).toFixed();
    //Trường hợp số news ít hơn số lượng bài viết/trang, ẩn nút next
    if (data.totalResults <= currentUser.pageSize) {
      btnNext.style.display = "none";
    }
  }
};
//Hiện news khi vừa load trang - Nếu người dùng chưa đăng nhập, hiện news theo mặc định
if (!currentUser) {
  //Mặc định - Hiện news chung, 10 bài 1 page, trang 1
  getNews("general", 10, 1);
} else {
  //Nếu đã đăng nhập, hiện news theo cài đặt của người dùng
  //Nếu người dùng chưa thay đổi cài đặt, hiện theo mặc định theo data có sẵn
  getNews(currentUser.category, currentUser.pageSize, pageNum.textContent);
}

//Event cho btn Next
btnNext.addEventListener("click", function (e) {
  //Chặn double click thực thi chèn 2 page vào 1 page
  if (e.detail === 1) {
    //Xóa html cũ
    newsContainer.innerHTML = "";
    //Hiện lại btn Previous khi ấn
    btnPrev.style.display = "block";
    //Tăng số page + 1
    pageNum.textContent++;
    //Get News tùy xem người dùng đã đăng nhập hay chưa
    if (!currentUser) {
      getNews("general", 10, pageNum.textContent);
    } else {
      getNews(currentUser.category, currentUser.pageSize, pageNum.textContent);
    }
    //Khi hết news (số trang === số trang tối đa) => ẩn nút Next
    if (pageNum.textContent === maxPage) {
      btnNext.style.display = "none";
    }
  }
});
//Event cho btn Previous
btnPrev.addEventListener("click", function (e) {
  //Chặn double click thực thi chèn 2 page vào 1 page
  if (e.detail === 1) {
    newsContainer.innerHTML = "";
    //Hiện btn Next
    btnNext.style.display = "block";
    //Giảm số page - 1
    pageNum.textContent--;
    //Số page = 1 thì ẩn btn Pre đi
    if (pageNum.textContent === "1") {
      btnPrev.style.display = "none";
    }
    if (!currentUser) {
      getNews("general", 10, pageNum.textContent);
    } else {
      getNews(currentUser.category, currentUser.pageSize, pageNum.textContent);
    }
  }
});
//Trường hợp số news ít hơn số lượng bài viết/trang, ẩn nút next
