const obj = {
  menuName: "",
  menuPrice: 0,
  menuDesc: "",
  store_id: 0
};

const menuRequestDto = {
  menuName: "",
  menuPrice: 0,
  menuDesc: "",
  storeId: 0,
}

window.onload = function () {
  var queryParams = new URLSearchParams(window.location.search);
  var receiveData = queryParams.get('id');
  menuRequestDto.storeId = receiveData;
  console.log(receiveData);
  // 여기서 필요한 작업 수행
};

function enroll(event) {
  event.preventDefault();
  console.log("enroll");
  var formData = new FormData();

  menuRequestDto.menuName = document.getElementById("menu_name").value;
  menuRequestDto.menuPrice = document.getElementById("menu_price").value;
  menuRequestDto.menuDesc = document.getElementById("menu_desc").value;
  const menuImage = document.getElementById("menu_image");
  formData.append('file', menuImage.files[0]);
  formData.append('menuRequestDto', new Blob([JSON.stringify(menuRequestDto)], { type: "application/json" }));
  console.log(formData);
  // FormData 출력
  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  const url = `http://127.0.0.1:8080/api/store/${menuRequestDto.storeId}/menus`;
  const token = `Bearer ${localStorage.getItem('token')}`;

  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  fetch(url, {
    headers: myHeaders,
    body: formData,
    method: "POST"
  })
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => {
    console.error('An error occurred while loading store data:', error);
  });
}

function loadFile(event) {
  console.log("file load");
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    img.style.width = "150px"; // 이미지의 가로 크기를 150px로 설정
    img.style.height = "150px"; // 이미지의 세로 크기를 150px로 설정
    var image_container = document.getElementById("image_container");
    image_container.innerHTML = '';
    image_container.appendChild(img);

    var menuImageBox = document.querySelector('.menu_image_box');

    obj.imgSrc = img;
  };
  reader.readAsDataURL(event.target.files[0]);
}
