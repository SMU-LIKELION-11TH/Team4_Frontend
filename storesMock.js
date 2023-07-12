const mockData = [
  {
    code: 200,
    httpStatus: 'OK',
    message: '요청에 성공하였습니다.',
    data: [
      {
        storeId: 1,
        storeName: '수정된분식집',
        storeDesc: '수정분식입니다.',
        startTime: 'storeTime',
        endTime: 'endtime',
        roadAddress: 'roadAddress입니다.',
        detailAddress: '상세주소',
        storeTel: 'storeTel',
        menuList: [],
        storeImageList: [
          {
            id: 2,
            storeFilename: 'bccf59bd-89cf-4ec1-a9a4-108561c98218.PNG',
            storeImageUrl:
              'D:\\finallikelion_team4\\Traditional-Market/files/bccf59bd-89cf-4ec1-a9a4-108561c98218.PNG',
          },
        ],
        averageStars: 4,
        countReviews: 123,
        userId: 1,
        categoryName: '분식',
      },
    ],
  },
];

$(document).ready(function () {
  loadStoresData(); // 가게 데이터 로드
  attachMenuClickEvent();
});

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

function loadStoresData() {
  const url = '/api/stores'; // 가게 데이터를 불러올 엔드포인트 URL
  const data = mockData[0].data; // Mock 데이터에서 실제 데이터를 가져옴
  renderTable(data); // 데이터를 테이블에 렌더링
}

function renderTable(data) {
  let tableBody = $('#stores-table tbody');
  tableBody.empty();

  data.forEach(function (store) {
    let row = $('<tr>');
    row.append($('<td>').text(store.categoryName));
    row.append($('<td>').text(store.storeName));
    row.append($('<td>').text(generateStarRating(store.averageStars)));
    row.append($('<td>').text(store.countReviews));
    row.append($('<td>').text(store.operatingStatus));
    tableBody.append(row);
  });
}

function attachMenuClickEvent() {
  $('.sidebar-menu ul li').on('click', function (event) {
    event.preventDefault(); // 기본 동작 중지

    let selectedCategory = $(this).find('span').text();

    // 선택한 카테고리에 해당하는 데이터만 필터링
    let filteredData = mockData[0].data.filter(function (store) {
      return store.categoryName === selectedCategory;
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
$('#stores-table').on('click', 'tr', function () {
  var trNum = $(this).index();
  var storeArr = Array.from(
    document.querySelectorAll('#stores-table tbody tr td:nth-child(2)')
  );

  console.log(storeArr[trNum].textContent);
  if (storeArr[trNum].textContent === '수정된분식집') {
    var link = './JumpoPage/망원 닭강정/store1.html';
    // location.href = link;
    window.open(link);
  }
});
