// Login 관련 로직입니다.
document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});

// 아래부터 작성해주세요

// 저장된 리뷰 임시 mockdata
const mockDataReview = [
  {
    reviewer: 'soo',
    stars: 5,
    content: '친절해요',
  },
  {
    reviewer: '예에',
    stars: 3,
    content: '평범해요',
  },
  {
    reviewer: '야아',
    stars: 4,
    content: '맛있어요',
  },
];

// -------------------------------------------------------------------------
// 페이지 시작 시 정보 불러오기
// 1. 가게 이름, 가게 번호, 가게 별점, 가게 설명

//--------------------------------통신용------------------------------
// $(document).ready(function() {
//   $.ajax({
//     url: '/api/data', // 백엔드에서 제공하는 url 넣는 곳
//     method: 'GET',
//     dataType: 'JSON',
//     success: function(response) {
//       const storeId = response.storeId;
//       const storeName = response.storeName;
//       const storeDesc = response.storeDesc;
//       const storeAddress = response.storeAddress;
//       const storeTime = response.storeTime;
//       const storeTel = response.storeTel;
//
//       $('#storeId').text(storeId);
//       $('#storeName').text(storeName);
//       $('#storeDesc').text(storeDesc);
//       $('#storeAddress').text(storeAddress);
//       $('#storeTime').text(storeTime);
//       $('#storeTel').text(storeTel);
//     },
//     error: function(error) {
//       console.log('Error:', error);
//     }
//   });
// });
//-----------------------------------------------------------------------

// 2. 리뷰 정보 불러오기
$(document).ready(function () {
  renderReviewTable(mockDataReview); // 초기에는 모든 데이터를 테이블에 출력
});

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
// function showReview() {
//   $.ajax({
//       type: "GET",
//       url: '???' , //백엔드에서 받아오기
//       data: {},
//       success: function (response) {
//           let reviews = response['all_reviews']
//           for (let i = 0; i < reviews.length; i++) {
//             let author = reviews[i]['author']
//             let title = reviews[i]['title']
//             let review = reviews[i]['review']

//             let tmp = `<tr>
//                         <td>${title}</td>
//                         <td>${author}</td>
//                         <td>${review}</td>
//                       </tr>`
//               $('#reviews-box').append(tmp)
//           }
//       }
//   })
// }
//-----------------------------------------------------------------------

// 3. 메뉴 사진, 메뉴 이름, 메뉴 설명

// 리뷰 작성
const ratingStars = [...document.getElementsByClassName('rating_star')];
let reviewData = [];
console.log(ratingStars);

function reviewSubmit() {
  const content = document.getElementById('content');
  let i;

  ratingStars.map((star) => {
    star.onclick = () => {
      i = ratingStars.indexOf(star);
      console.log(i);
    };
  });
  const stars = i + 1;

  const newReview = {
    content: content,
    stars: stars,
  };

  reviewData.append(newReview);
  console.log(reviewData);
}

//--------------------------------통신용------------------------------------
// function reviewSubmit(){
//   var content = $('#content').val();
//   var stars = $('#stars').val();

//   $("#reivewSubmit").on('click',function() {
//     $.ajax({
//       type: 'POST',
//       url:'???'                ,  // 백엔드에서 받아오기
//       contentType : 'application/json',
//       data: JSON.stringify({
//         'content': content,
//         'stars': stars
//       }),
//       success : function(data){
//         alert('Success');
//       },
//       error: function(request, status, error){
//         alert('Error');
//       }
//     })
//   })
// }

// executeRating(ratingStars, ratingResult);
// printRatingResult(ratingResult);

// 별점 세는 함수
function executeRating(stars, result) {
  const starClassActive = 'rating_star far fa-star';
  const starClassUnactive = 'rating_star far fa-star';
  const starsLength = stars.length;
  let i;

  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);
      console.log(i);

      if (star.className.indexOf(starClassUnactive) !== -1) {
        printRatingResult(result, i + 1);
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        printRatingResult(result, i);
        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
      }
    };
  });
}

function printRatingResult(result, num = 0) {
  result.textContent = `${num}/5`;
}
