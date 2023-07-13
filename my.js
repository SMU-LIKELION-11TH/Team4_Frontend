document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});

function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}

// 로그인 되면 로그인 정보 로컬스토리지에서 확인하고, 로그아웃 버튼으로 변경하는 로직
window.onload = function main() {
  const loginButton = document.querySelector('.login-button');

  // Check if user is logged in
  const userData = localStorage.getItem('user');
  if (userData) {
    // User is logged in
    const user = JSON.parse(userData);
    loginButton.textContent = '로그아웃';
    loginButton.addEventListener('click', logout);
    // 유저 객체 사용
    console.log(user.id);
    console.log(user.email);
    console.log(user.nickname);
    // 로그아웃 되면 버튼 내용 변경
  } else {
    // User is logged out
    loginButton.textContent = '로그인 / 회원가입';
    loginButton.addEventListener('click', function () {
      window.location.href = './LoginPage/login.html';
    });
  }
};

// 로그인 확인 시, 해당 유저의 이미지로 확인
document.addEventListener('DOMContentLoaded', function () {
  const socialIconsDiv = document.querySelector('.social-icons div');
  // 로그인 되면 User 정보를 로컬스토리지에 저장
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.imageUrl) {
    // 이미지 정보가 있으면, url보여줌
    socialIconsDiv.style.backgroundImage = `url(${user.imageUrl})`;
    socialIconsDiv.addEventListener('click', function () {
      window.location.href = './AdminPage/admin.html';
    });
  } else {
    // null인 경우 빈 이미지로 설정
    socialIconsDiv.style.backgroundImage = 'url(./img/owner.png)';
    socialIconsDiv.addEventListener('click', function () {
      window.location.href = './AdminPage/admin.html';
    });
  }
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
  code: 200,
  httpStatus: 'OK',
  message: '요청에 성공하였습니다.',
  data: [
    {
      id: 2,
      stars: 5,
      content: '최고에요요',
      reviewer: 'ceo',
      storeName: '윤가네',
      createdAt: '2023-07-10 03:41:57',
      updatedAt: '2023-07-10 03:41:57',
    },
    {
      id: 3,
      stars: 4,
      content: '맛있어요',
      reviewer: 'ceo',
      storeName: '윤가네',
      createdAt: '2023-07-10 03:42:15',
      updatedAt: '2023-07-10 03:42:15',
    },
    {
      id: 1,
      stars: 3,
      content: '보통이에요요',
      reviewer: 'ceo',
      storeName: '윤가네',
      createdAt: '2023-07-10 03:39:07',
      updatedAt: '2023-07-10 03:39:07',
    },
  ],
};

const jsonData = JSON.stringify(responseData);

fetch('/api/user/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: jsonData,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const reviewbox = document.getElementById('reviewbox');
const user = document.getElementById('user');

responseData.data.forEach((review) => {
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

const reviewer = responseData.data[0].reviewer;
const add = '님';
const reviewerElement = document.getElementById('reviewer');
reviewerElement.textContent = reviewer + add;