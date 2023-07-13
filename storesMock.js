$(document).ready(function () {
  loadStoresData(); // Load store data from API
  attachMenuClickEvent();
});

let fetchdata = []; // Initialize fetchdata array

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

const url = 'http://127.0.0.1:8080/api/stores';
const token = localStorage.getItem('token');
var teadbear = 'Bearer ' + token;
console.log(teadbear);
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + token);

function loadStoresData() {
  console.log(token);
  fetch(url, {
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let data1 = data.data;
      console.log(data1);
      fetchdata = data1; 
      renderTable(data1);
    })
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });
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
    row.append($('<td>').text(getOperatingStatus(store.startTime, store.endTime)));
    tableBody.append(row);
  });
}

function getOperatingStatus(startTime, endTime) {
  // 현재 시간을 초로 변환
  let currentTime = Math.floor(Date.now() / 1000);

  // startTime과 endTime을 초로 변환
  let start = convertToSeconds(startTime);
  let end = convertToSeconds(endTime);

  // 현재 시간이 운영 시간 내에 있는지 확인
  if (currentTime >= start && currentTime <= end) {
    return '운영 중';
  } else {
    return '미운영';
  }
}

function convertToSeconds(time) {
  let [hours, minutes] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60;
}

function attachMenuClickEvent() {
  $('.sidebar-menu ul li').on('click', function (event) {
    event.preventDefault(); // Prevent default action

    let selectedCategory = $(this).find('span').text();
    console.log(selectedCategory);
    console.log(fetchdata);

    // Check if fetchdata is empty or undefined
    if (!fetchdata || !fetchdata.length) {
      // Handle the case when data is not available
      console.log('Data is not available');
      return;
    }

    let filteredData = fetchdata.filter(function (item) {
      return item.categoryName === selectedCategory;
    });

    console.log('Filtered data:', filteredData);

    renderTable(filteredData);
    updateTableHeading(selectedCategory);
  });
}


// Event handler for clicking on a table row
$('#stores-table').on('click', 'tr', function () {
  var trNum = $(this).index();
  var storeArr = Array.from(
    document.querySelectorAll('#stores-table tbody tr td:nth-child(2)')
  );

  console.log(storeArr[trNum].textContent);
  console.log(fetchdata);

  // Get the store name from the clicked row
  var clickedStoreName = storeArr[trNum].textContent;

  // Find the store in the data array that matches the clicked store name
  const clickedStore = fetchdata.find(
    (store) => store.storeName === clickedStoreName
  );

  if (clickedStore) {
    const selectedStoreID = clickedStore.storeId;
    console.log(selectedStoreID);
    window.open(`./JumpoPage/jumpo.html?id=${selectedStoreID}`);
  }
});
