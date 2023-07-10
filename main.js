// 로그인 로직은 건들이시면 안됩니다.
document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = './LoginPage/login.html';
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
    // You can access the user properties as needed
    console.log(user.id);
    console.log(user.email);
    console.log(user.nickname);
    // ...
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
  } else {
    // null인 경우 빈 이미지로 설정
    socialIconsDiv.style.backgroundImage = `none`;
  }
});

// 여기서부터 카카오 맵 로직 구현 부탁드립니다.
var mapContainer = document.getElementById('map');
var mapOption = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 1,
};

var map = new kakao.maps.Map(mapContainer, mapOption);

function searchAddressToCoordinate(address) {
  var geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });
      map.setCenter(coords);
    }
  });
}

var addresses = [
  '서울특별시 마포구 망원동 망원로8길 27',
  '서울특별시 마포구 망원동 414-108',
  '서울특별시 마포구 망원제1동 414-26',
];

for (var i = 0; i < addresses.length; i++) {
  searchAddressToCoordinate(addresses[i]);
}
