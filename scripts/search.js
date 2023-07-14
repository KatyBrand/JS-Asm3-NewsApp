"use strict";
//DOM Element
const inputQuery = document.getElementById("input-query");
const searchBar = document.getElementById("main");
//Biến chứa số trang tối đa
let maxPage;
//Ẩn nút previous từ đầu
btnPrev.style.display = "none";

//Event khi ấn SEARCH
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  //Validate dữ liệu đầu vào
  if (!inputQuery.value) {
    alert("Please type something!");
    //Trên newsapi.org có nói ko search được quá 500 kí tự
  } else if (inputQuery.value.length >= 500) {
    alert("Max length of search is 500 characters!");
  }
  //Xóa phần tử cũ trong newsContainer (nếu có)
  newsContainer.innerHTML = "";
  //Ẩn nút Previous
  btnPrev.style.display = "none";
  //Đổi lại số trang
  pageNum.textContent = 1;
  //Hiện dữ liệu theo từ khóa user nhập (trang 1)
  getNews(inputQuery.value, 1);
});
//Fetch API
//Tham số query là từ khóa tìm kiếm, page là số trang
const getNews = async function (query, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&pageSize=5&page=${page}&apiKey=9489d529da8d414aa425093c6a952f9b`
    );
    const data = await res.json();
    if (data.code === "rateLimited" || data.status === "error") {
      throw new Error(data.message);
    }
    renderData(data);
  } catch (err) {
    console.log(err.message);
  }
};

const renderData = function (data) {
  const renderNews = function (article) {
    //HTML - Nếu news ko có hình ảnh, hiện hình ảnh mặc định
    //Nếu có lỗi 403, hiện ảnh mặc định
    const html = `<div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                <img
                    src="${
                      article.urlToImage ? article.urlToImage : "news.jpg"
                    }" onerror="this.onerror=null;this.src='news.jpg';"
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
  //Lặp qua news để chèn
  if (data.articles) {
    for (let i = 0; i < data.articles.length; i++) {
      renderNews(data.articles[i]);
    }
  }
  //Nếu không tìm được kết quả nào:
  //Hiện lỗi như bên dưới, ẩn phần Btn next + số page đi
  if (data.totalResults === 0) {
    const errorNoti = document.getElementById("no-result");
    if (!errorNoti) {
      newsContainer.innerHTML = "";
      const html = `<p id="no-result" class="text-center" style="color:red">No articles found. Try another keywords!</p>`;
      searchBar.insertAdjacentHTML("beforeend", html);
      document.querySelector(".disabled").style.display = "none";
    }
    //Nếu có kết quả tìm kiếm:
  } else {
    const errorNoti = document.getElementById("no-result");
    //Tìm phần hiện lỗi (nếu có) để ẩn đi
    if (errorNoti) {
      //Xóa lỗi đi
      errorNoti.parentNode.removeChild(errorNoti);
      //Hiện lại số page
      document.querySelector(".disabled").style.display = "block";
    }
  }
  //Số trang tối đa bằng tổng số news chia 5 (mặc định), làm tròn
  maxPage = (data.totalResults / 5).toFixed();

  //Trường hợp không có kết quả, hoặc số bài viết <= 5 (nghĩa là chỉ đủ 1 page )
  if (data.totalResults <= 5) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};
//Event cho btn Next
btnNext.addEventListener("click", function (e) {
  e.preventDefault();
  //Thêm if để lỡ chưa ấn search đã ấn Next ++
  if (inputQuery.value) {
    //Hiện lại btn Previous khi ấn
    btnPrev.style.display = "block";
    //Xóa html cũ
    newsContainer.innerHTML = "";
    //Tăng số page + 1
    pageNum.textContent++;
    //Get News tùy xem người dùng đã đăng nhập hay chưa
    getNews(inputQuery.value, pageNum.textContent);

    //Khi hết news (số trang === số trang tối đa) => ẩn nút Next
    if (pageNum.textContent === maxPage) {
      btnNext.style.display = "none";
    }
  }
});
//Event cho btn Previous
btnPrev.addEventListener("click", function (e) {
  e.preventDefault();
  //Hiện btn Next
  btnNext.style.display = "block";
  //Giảm số page - 1
  pageNum.textContent--;
  //Số page = 1 thì ẩn btn Pre đi
  if (pageNum.textContent === "1") {
    btnPrev.style.display = "none";
  }
  newsContainer.innerHTML = "";
  getNews(inputQuery.value, pageNum.textContent);
});
///
