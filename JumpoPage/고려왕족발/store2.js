// Login 관련 로직입니다.
document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});

// 아래부터 작성해주세요

// 저장된 리뷰 임시 mockdata
const mockDataReview = [
  {
    reviewer: 'ㅇㅇ',
    stars: 5,
    content: '양이 많아요',
  },
  {
    reviewer: 'ㅎㅎ',
    stars: 3,
    content: '쏘쏘',
  },
  {
    reviewer: '아',
    stars: 4,
    content: '맛있어요',
  },
  {
    reviewer: '이',
    stars: 5,
    content: '굿굿',
  },
  {
    reviewer: '디',
    stars: 5,
    content: '좋아요',
  },
  {
    reviewer: '??',
    stars: 2,
    content: '쫄깃해요',
  },
];

const storeData = () => [
  {
    storeId: 2,
    storeName: "고려왕족발",
    storeDesc: "쫄깃하고 맛있는 족발",
    storeTime: "8:00-21:00",
    storeTel: "02-3142-9952",
    menuList: [
      {
        id: 1,
        menuName: "족발(대)",
        menuPrice: 40000,
        menuDesc: "메뉴설명~",
        imageName: "menu-img1.png",
        imageUrl: "./menu1.jpeg"
      },
      {
        id: 2,
        menuName: "족발(중)",
        menuPrice: 28000,
        menuDesc: "메뉴설명~",
        imageName: "menu-img2.png",
        imageUrl: "./menu1.jpeg"
      },
      {
        id: 3,
        menuName: "족발(소)",
        menuPrice: 12000,
        menuDesc: "메뉴설명~",
        imageName: "menu-img2.png",
        imageUrl: "./menu1.jpeg"
      }
    ],
    storeImageList: [
      {
        storeUrl: "url",
        storeFilename: "./store2.jpeg"
      }
    ]
  }
];

// -------------------------------------------------------------------------
// 페이지 시작 시 정보 불러오기
// 1. 가게 이름, 가게 번호, 가게 별점, 가게 설명
$(document).ready(function () {
  showStoreData();
  showStoreImage(storeData);
  renderReviewTable(mockDataReview); // 초기에는 모든 데이터를 테이블에 출력
  showMenu(storeData);
});

function showStoreData() {
  var storeName = document.getElementById("storeName");
  var storeDesc = document.getElementById("storeDesc");
  var storeTime = document.getElementById("storeTime");
  var storeTel = document.getElementById("storeTel");

  storeName.textContent = storeData()[0].storeName;
  storeDesc.textContent = storeData()[0].storeDesc;
  storeTime.textContent = "영업시간: " + storeData()[0].storeTime;
  storeTel.textContent = storeData()[0].storeTel;
}

function showStoreImage(data) {
  const imageList = document.getElementById("storeImageList");

  data()[0].storeImageList.forEach((img) => {
    const imageItem = document.createElement("li");
    
    const image = document.createElement("img");
    image.src = img.storeFilename;
    image.className = "store-img";
    imageItem.appendChild(image);
    imageList.appendChild(imageItem);
  })
}

//--------------------------------통신용------------------------------
// $(document).ready(function() {
//   $.ajax({
//     url: '/api/data', // 백엔드에서 제공하는 url 넣는 곳
//     method: 'GET',
//     dataType: 'JSON',
//     success: function(response) {
//       const storeName = response.storeName;
//       const storeDesc = response.storeDesc;
//       const storeTime = response.storeTime;
//       const storeTel = response.storeTel;
//       const storeImageList = response.storeImageList;
//    
//       $('#storeName').text(storeName);
//       $('#storeDesc').text(storeDesc);
//       $('#storeTime').text(storeTime);
//       $('#storeTel').text(storeTel);
//     },
//     error: function(error) {
//       console.log('Error:', error);
//     }
//   });
// });
// 
// function getStoreImage(data) {
//   let imageList = []
//   $.ajax({
//     //url:
//     method: 'GET',
//     async: false,
//     contentType: 'application/json',
//     success: function(response) {
//       lmageList = response.storeImageList;
//     },
//     error: function(error){
//       console.log("error:", error);
//     }
//   })
//   return lmageList;
// }
//-----------------------------------------------------------------------

// 2. 리뷰 정보 불러오기
function renderReviewTable(data) {
  let tableBody = $('#review-table tbody');
  tableBody.empty();

  data.forEach(function (review) {
    let row = $('<tr>');
    let starRating = review.stars; // 리뷰의 별점

    // 별을 그리는 기능 추가
    let stars = $('<span>').addClass('stars');
    for (let i = 0; i < starRating; i++) {
      stars.append($('<i>').addClass('fas fa-star').css('color', '#ffd700'));
    }

    row.append($(stars));
    row.append($('<td>').text(review.content));
    row.append($('<td>').text('(' + review.reviewer + ')'));
    tableBody.append(row);
  });
}

//----------------- 통신용 -----------------------------------------
// let savedReview = getReview();

// function getReview() {
//   let reviewData = []
//   $.ajax({
//       type: "GET",
//       //url: '???' ,
//       async: false,
//       contentType: 'application/json',
//       success: function (response) {
//           let reviews = response.reviews;
//           for (let i = 0; i < reviews.length; i++) {
//             let reviewer = reviews[i]['reviewer']
//             let content = reviews[i]['content']
//             let stars = reviews[i]['stars']

//             reviewData.push(
//               {
//                 reviewer : reviewer,
//                 content : content,
//                 stars : stars
//               })
//           }
//       }
//   })
//   return reviewData;
// }
//-----------------------------------------------------------------------



// 리뷰 작성
const ratingStars = [...document.getElementsByClassName('rating_star')];
const ratingResult = document.querySelector('.rating_result');
executeRating(ratingStars, ratingResult);

const reviewData = [];

function executeRating(stars) {
  const starClassActive = 'rating_star fas fa-star';
  const starClassInactive = 'rating_star far fa-star';
  const starsLength = stars.length;
  let selectedStars = 0;
  
  stars.forEach((star, index) => {
    star.onclick = () => {
      for (let i = 0; i < starsLength; i++) {
        if (i <= index) {
          stars[i].className = starClassActive;
        } else {
          stars[i].className = starClassInactive;
        }
      }
      
      selectedStars = index + 1;
      printRatingResult(selectedStars);
    };
  });

  function printRatingResult(num = 0) {
    ratingResult.textContent = `${num}`;
    console.log(num);
  }
}

const reviewForm = document.querySelector('.write-review');
reviewForm.addEventListener('submit', reviewPost);

function reviewPost(e) {
  e.preventDefault(); // 기본 동작을 막음

  const content = document.getElementById('content').value;
  const stars = parseInt(ratingResult.textContent);

  const newReview = {
    content: content,
    stars: stars,
  };

  reviewData.push(newReview);
  console.log(reviewData);
}

//--------------------------------통신용------------------------------------
// function reviewPost(e) {
//    e.preventDefault();
//    const content = document.getElementById('content').value;
//    const stars = parseInt(ratingResult.textContent);

//    const newReview = {
//     content: content,
//     stars: stars,
//   };

//   $.ajax({
//     type: 'POST',
//     // url:
//     contentType: 'application/json',
//     data: JSON.stringify({
//       'content': content,
//       'stars': stars
//     }),
//     success: function(data){
//       alert('Success');
//     },
//     error: function(request, status, error){
//       alert('Error');
//     }
//   })  
// }
//-------------------------------------------------------------------------

// 3. 메뉴 사진, 메뉴 이름, 메뉴 설명
function showMenu(data) {
  const menuListElement = document.getElementById("menuList");
  
  data()[0].menuList.forEach((menu) => {
    const listItem = document.createElement("li");
    listItem.className = "menu_details";
    
    const image = document.createElement("img");
    image.className = "menu_image";
    image.src = menu.imageUrl;
    image.alt = menu.menuName;
    listItem.appendChild(image);
    
    const menuText = document.createElement("div");
    menuText.className = "menu_text";
    
    const name = document.createElement("h2");
    name.className = "menu_name";
    name.textContent = menu.menuName;
    menuText.appendChild(name);
    
    const price = document.createElement("p");
    price.className = "menu_price";
    price.textContent = menu.menuPrice + "원";
    menuText.appendChild(price);
    
    const description = document.createElement("p");
    description.className = "menu_desc";
    description.textContent = menu.menuDesc;
    menuText.appendChild(description);
    
    listItem.appendChild(menuText);
    menuListElement.appendChild(listItem);    
  })
}


// —————————————통신용——————————————————
// function getMenu() {
//   var menuData = [];
//   $.ajax({
//       type: "GET",
//       url: '???' , //백엔드에서 받아오기
//       data: {},
//       async: false,
//       success: function (response) {
//           let menu = response['menuList']
//           for (let i = 0; i < menuList.length; i++) {
//             let menuImg = menuList[i]['imageUrl']
//             let menuName = menuList[i]['menuName']
//             let menuPrice = menuList[i]['menuPrice']
//             let menuDesc = menuList[i]['menuDesc']

//             menuData = JSON.parse(menu.responseText);
//           }
//       }
//   })
//   return menuData;
// }
// ——————————————————————————————————