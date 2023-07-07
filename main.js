// 로그인 로직은 건들이시면 안됩니다.
document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = './LoginPage/login.html';
});

// 여기서부터 카카오 맵 로직 구현 부탁드립니다.
var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 1
    };

var map = new kakao.maps.Map(mapContainer, mapOption);

function searchAddressToCoordinate(address) {
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
                map.setCenter(coords);
            }
        });
    }

var addresses = [
    "서울특별시 마포구 망원동 망원로8길 27",
    "서울특별시 마포구 망원동 414-108",
    "서울특별시 마포구 망원제1동 414-26",
];

for (var i = 0; i < addresses.length; i++) {
    searchAddressToCoordinate(addresses[i]);
}