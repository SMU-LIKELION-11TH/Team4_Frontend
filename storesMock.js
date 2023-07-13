$(document).ready(function () {
  loadStoresData(); // Load store data from API
  attachMenuClickEvent();
});

const fetchdata = [];
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
    "headers": myHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      let data1 = data.data;
      console.log(data1);
      fetchdata.push(data1);
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
    row.append($('<td>').text(store.operatingStatus));
    tableBody.append(row);
  });
}

function attachMenuClickEvent() {
  $('.sidebar-menu ul li').on('click', function (event) {
    event.preventDefault(); // Prevent default action

    let selectedCategory = $(this).find('span').text();

    // Send request to the API to get filtered data based on selected category
    const url = `/api/stores?category=${encodeURIComponent(selectedCategory)}`;
    const token = localStorage.getItem('token'); // Get the token value from localStorage

    fetch(url, {
      headers: {
        Authorization: token, // Include the token in the request headers
      },
    })
      .then((response) => response.json())
      .then((data) => {
        renderTable(data); // Render the filtered data in the table
        updateTableHeading(selectedCategory); // Update the table heading
      })
      .catch((error) => {
        console.error('An error occurred while filtering store data:', error);
      });
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
    (store) => store.storeName === clickedStoreName );

  if (clickedStore) {
    const selectedStoreID = clickedStore.storeId;
    console.log(selectedStoreID);
    window.open(`./JumpoPage/jumpo.html?id=${selectedStoreID}`);
  }
});
