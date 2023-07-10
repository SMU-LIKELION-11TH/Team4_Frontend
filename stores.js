// Mock 데이터 통신 예상
const mockData = [
  {
    category: '분식',
    storeName: '오공찬',
    storeRating: 4.8,
    reviewCount: 3,
    operatingStatus: '운영중',
  },
  {
    category: '반찬',
    storeName: '오공찬',
    storeRating: 4.9,
    reviewCount: 3,
    operatingStatus: '운영중',
  },
  {
    category: '농산물',
    storeName: '오공찬',
    storeRating: 4.7,
    reviewCount: 3,
    operatingStatus: '운영중',
  },
  {
    category: '수산/횟집',
    storeName: '오공찬',
    storeRating: 3.5,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '축산물',
    storeName: '오공찬',
    storeRating: 2,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '과일',
    storeName: '오공찬',
    storeRating: 1.6,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '떡집',
    storeName: '오공찬',
    storeRating: 1.7,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '방앗간/건강원',
    storeName: '오공찬',
    storeRating: 3.8,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '마트',
    storeName: '오공찬',
    storeRating: 5,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '의류',
    storeName: '오공찬',
    storeRating: 4,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '화장품/잡화',
    storeName: '오공찬',
    storeRating: 3,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '꽃집/귀금속',
    storeName: '오공찬',
    storeRating: 4,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  {
    category: '건어물/젓갈',
    storeName: '오공찬',
    storeRating: 5,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
  // 위에 해당하는 카테고리 외에는 나머지는 다 기타 카테고리로 들어감.
  {
    category: '기타',
    storeName: '오공찬',
    storeRating: 5,
    reviewCount: 3,
    operatingStatus: '휴가',
  },
];

function generateStarRating(rating) {
  const maxRating = 5;
  const fullStar = '⭐️';
  const emptyStar = '☆';

  let fullStars = Math.floor(rating);
  let hasHalfStar = rating - fullStars >= 0.5;
  let emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  let starRating = '';

  for (let i = 0; i < fullStars; i++) {
    starRating += fullStar;
  }

  if (hasHalfStar) {
    starRating += emptyStar;
  }

  for (let i = 0; i < emptyStars; i++) {
    starRating += emptyStar;
  }

  return starRating;
}

// 페이지가 로드되면 실행되는 함수
$(document).ready(function () {
  renderTable(mockData);
  attachMenuClickEvent();
});

function renderTable(data) {
  let tableBody = $('#stores-table tbody');
  tableBody.empty();

  data.forEach(function (store) {
    let row = $('<tr>');
    row.append($('<td>').text(store.category));
    row.append($('<td>').text(store.storeName));
    row.append($('<td>').text(generateStarRating(store.storeRating)));
    row.append($('<td>').text(store.reviewCount));
    row.append($('<td>').text(store.operatingStatus));
    tableBody.append(row);
  });
}

function attachMenuClickEvent() {
  $('.sidebar-menu ul li').on('click', function (event) {
    event.preventDefault(); // 기본 동작 중지

    let selectedCategory = $(this).find('span').text();

    // 선택한 카테고리에 해당하는 데이터만 필터링
    let filteredData = mockData.filter(function (store) {
      return store.category === selectedCategory;
    });

    renderTable(filteredData); // 필터링된 데이터를 테이블에 출력
    updateTableHeading(selectedCategory); // 테이블 제목 업데이트
  });
}

function updateTableHeading(category) {
  if (category === '기타') {
    $('#table-heading').text('기타 카테고리의 HOT한 점포 정보');
  } else {
    $('#table-heading').text(`${category} 카테고리의 HOT한 점포 정보`);
  }
}

// 내가 추가한 부분
$("#stores-table").on("click", "tr", function () {
  var trNum = $(this).index();
  var storeArr = Array.from(document.querySelectorAll('#stores-table tbody tr td:nth-child(2)'));

  console.log(storeArr[trNum].textContent);
  if (storeArr[trNum].textContent === "오공찬") {
    var link = './JumpoPage/망원 닭강정/store1.html';
    // location.href = link;
    window.open(link);
  }
});


// 실제 스프링 통신시 (Ajax)

// 페이지가 로드되면 실행되는 함수
// $(document).ready(function () {
//   fetchAndRenderData(); // 데이터를 가져와서 테이블에 출력
//   attachMenuClickEvent(); // 사이드바 메뉴 항목에 클릭 이벤트 연결
// });

// function fetchAndRenderData() {
//   $.ajax({
//     url: '/api/stores', // Spring 서버의 API 엔드포인트 URL
//     method: 'GET',
//     success: function (data) {
//       renderTable(data); // 받아온 데이터를 테이블에 출력
//     },
//     error: function (error) {
//       console.error('Error fetching data:', error);
//     },
//   });
// }

// function renderTable(data) {
//   var tableBody = $('#stores-table tbody');
//   tableBody.empty();

//   data.forEach(function (store) {
//     var row = $('<tr>');
//     row.append($('<td>').text(store.category));
//     row.append($('<td>').text(store.storeName));
//     row.append($('<td>').text(store.storeRating));
//     row.append($('<td>').text(store.reviewCount));
//     row.append($('<td>').text(store.operatingStatus));
//     tableBody.append(row);
//   });
// }

// function attachMenuClickEvent() {
//   $('.sidebar-menu ul li').on('click', function (event) {
//     event.preventDefault(); // 기본 동작 중지

//     var selectedCategory = $(this).find('span').text();

//     $.ajax({
//       url: '/api/stores', // Spring 서버의 API 엔드포인트 URL
//       method: 'GET',
//       data: { category: selectedCategory }, // 선택한 카테고리 전달
//       success: function (data) {
//         renderTable(data); // 받아온 필터링된 데이터를 테이블에 출력
//       },
//       error: function (error) {
//         console.error('Error fetching filtered data:', error);
//       },
//     });
//   });
// }
