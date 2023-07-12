document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});

const imageInput = document.getElementById('image');
const profileImage = document.getElementById('profileimg');

imageInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
  profileImage.src = e.target.result;
};

reader.readAsDataURL(file);
});

const responseData = {
  "code": 200,
  "httpStatus": "OK",
  "message": "요청에 성공하였습니다.",
  "data": [
      {
          "id": 2,
          "stars": 5,
          "content": "최고에요요",
          "reviewer": "ceo",
          "storeName": "윤가네",
          "createdAt": "2023-07-10 03:41:57",
          "updatedAt": "2023-07-10 03:41:57"
      },
      {
          "id": 3,
          "stars": 4,
          "content": "맛있어요",
          "reviewer": "ceo",
          "storeName": "윤가네",
          "createdAt": "2023-07-10 03:42:15",
          "updatedAt": "2023-07-10 03:42:15"
      },
      {
          "id": 1,
          "stars": 3,
          "content": "보통이에요요",
          "reviewer": "ceo",
          "storeName": "윤가네",
          "createdAt": "2023-07-10 03:39:07",
          "updatedAt": "2023-07-10 03:39:07"
      }
  ]
}

const jsonData = JSON.stringify(responseData);

fetch('/api/user/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: jsonData,
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const reviewbox = document.getElementById('reviewbox');

  responseData.data.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    const store = document.createElement('p');
    store.textContent = `가게 이름: ${review.storeName} -`;
    const stars = document.createElement('p');
    stars.textContent = `별점: ${review.stars} -`;
    const content = document.createElement('p');
    content.textContent = `평가: ${review.content} -`;
    const reviewer = document.createElement('p');
    reviewer.textContent = `리뷰어: ${review.reviewer} -`;
    const reviewdate = document.createElement('p');
    reviewdate.textContent = `작성일: ${review.createdAt}`;
  
    reviewElement.appendChild(store);
    reviewElement.appendChild(stars);
    reviewElement.appendChild(content);
    reviewElement.appendChild(reviewer);
    reviewElement.appendChild(reviewdate);
    reviewbox.appendChild(reviewElement);
  });




