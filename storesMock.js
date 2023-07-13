$(document).ready(function () {
  loadStoresData(); // Load store data from API
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
  const url = 'http://127.0.0.1:8080/api/stores';
  const token = localStorage.getItem('token'); // Get the token value from localStorage
  console.log(token);
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
      console.log(data);
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
    console.log(token);

    fetch(url, {
      headers: {
        Authorization: 'Bearer' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  // Get the store name from the clicked row
  var clickedStoreName = storeArr[trNum].textContent;

  // Find the store in the data array that matches the clicked store name
  const clickedStore = mockData[0].data.find(
    (store) => store.storeName === clickedStoreName
  );

  if (clickedStore) {
    const selectedStoreID = clickedStore.storeId;
    window.open(`./JumpoPage/jumpo.html?id=${selectedStoreID}`);
  }
});
