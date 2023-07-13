// 로그인 로직은 건들이시면 안됩니다.
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
      window.location.href = '../LoginPage/login.html';
    });
  }
};
main2()


const obj = {
  storeIamgeUrl: '',
  imageUrl: '',
  storeName: '스토어이름',
  storeDesc: '스토어설명',
  roadAddress: '도로명주소',
  detailAddress: '상세주소',
  startTime: '',
  endTime: '',
  storeTel: '01012345678',
  nickname: '!@##$',
  store_id: '',
};

function addPlaceholder(elementId, placeholderText) {
  var element = document.getElementById(elementId);
  element.placeholder = placeholderText;
}
function addPlaceholders() {
  addPlaceholder('store_name', obj.storeName);
  addPlaceholder('store_desc', obj.storeDesc);
  addPlaceholder('sample4_roadAddress', obj.roadAddress);
  addPlaceholder('sample4_detailAddress', obj.detailAddress);
  addPlaceholder('store_phone1', obj.storeTel.slice(0, 3));
  addPlaceholder('store_phone2', obj.storeTel.slice(3, 7));
  addPlaceholder('store_phone3', obj.storeTel.slice(7, 11));

  var imageElement = document.getElementById('image_element');
  imageElement.setAttribute('src', obj.storeIamgeUrl);
  var ownerImg = document.getElementById('owner-img');
  // ownerImg.setAttribute("src",obj.imageUrl);

  var element = document.getElementById('owner-nickname');
  element.textContent = obj.nickname;
}

function main2() {
  console.log("loading");

  const url = 'http://127.0.0.1:8080/api/user';
  const token = localStorage.getItem('token');
  var teadbear = 'Bearer ' + token;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);
  
  fetch(url, {
    headers: myHeaders,
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      obj.imageUrl=imageUrl;
      obj.nickname=nickname;
      console.log(data);
    })
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });
    
    
  const storeUrl = 'http://127.0.0.1:8080/api/user/stores';

  fetch(storeUrl, {
    headers: myHeaders,
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      console.log(data.data);
      if(data.data.length==0){
        alert ("점포가 아직 등록되지 않았습니다.");
        window.location.href = "./admin.html"
      }else{
        obj.storeName = data.data[0].storeName,
        obj.storeDesc = data.data[0].storeDesc,
        obj.store_id = data.data[0].storeId,
        obj.startTime = data.data[0].startTime,
        obj.endTime = data.data[0].endTime,
        obj.startTime = data.data[0].startTime,
        obj.endTime = data.data[0].endTime,
        obj.roadAddress = data.data[0].roadAddress,
        obj.detailAddress = data.data[0].detailAddress,
        obj.storeTel = data.data[0].storeTel

        console.log(obj.storeName);
        console.log(obj);
        addPlaceholders();
      }
    })
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });
    
}

function loadFile(event) {
  console.log('file load');
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = document.createElement('img');
    img.setAttribute('src', event.target.result);
    img.style.width = '150px'; // 이미지의 가로 크기를 100px로 설정
    img.style.height = '150px'; // 이미지의 세로 크기를 100px로 설정
    var image_container = document.getElementById('image_container');
    image_container.innerHTML = '';
    image_container.appendChild(img);

    var storeImageBox = document.querySelector('.store_image_box');

    obj.storeIamgeUrl = img;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ''; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr +=
          extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample4_postcode').value = data.zonecode;
      document.getElementById('sample4_roadAddress').value = roadAddr;
      document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if (roadAddr !== '') {
        document.getElementById('sample4_extraAddress').value = extraRoadAddr;
      } else {
        document.getElementById('sample4_extraAddress').value = '';
      }

      var guideTextBox = document.getElementById('guide');
      // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
        guideTextBox.style.display = 'block';
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
        guideTextBox.style.display = 'block';
      } else {
        guideTextBox.innerHTML = '';
        guideTextBox.style.display = 'none';
      }
    },
  }).open();
}
function displayMenuList(menuData) {
  var storeMenuListBox = document.querySelector('.store_menu_list_box');
  storeMenuListBox.innerHTML = '';

  if (menuData.length === 0) {
    var noMenuMsg = document.createElement('p');
    noMenuMsg.textContent = '등록된 메뉴가 없습니다.';
    storeMenuListBox.appendChild(noMenuMsg);
    return;
  }

  menuData.forEach(function (menu) {
    var menuElement = createMenuElement(
      menu.menuName,
      menu.menuPrice,
      menu.menuDesc,
      menu.menuImage
    );
    storeMenuListBox.appendChild(menuElement);
  });
  function createMenuElement(menuName, menuPrice, menuDesc, menuImage) {
    var menuElement = document.createElement('div');
    menuElement.setAttribute('class', 'menuElement');

    var menuImageElem = document.createElement('img');
    menuImageElem.setAttribute('class', 'menuImageElem');
    menuImageElem.src = menuImage;
    menuImageElem.alt = '메뉴 이미지';
    menuElement.appendChild(menuImageElem);

    var menuNameElem = document.createElement('p');
    menuNameElem.textContent = '메뉴 이름: ' + menuName;
    menuNameElem.setAttribute('class', 'menuNameElem');
    menuElement.appendChild(menuNameElem);

    var menuPriceElem = document.createElement('p');
    menuPriceElem.setAttribute('class', 'menuPriceElem');
    menuPriceElem.textContent = '메뉴 가격: ' + menuPrice + '원';
    menuElement.appendChild(menuPriceElem);

    var menuDescElem = document.createElement('p');
    menuDescElem.setAttribute('class', 'menuDescElem');
    menuDescElem.textContent = '메뉴 설명: ' + menuDesc;
    menuElement.appendChild(menuDescElem);

    return menuElement;
  }
}
//해당 점포의 id를 dataToSend에 붙여 새 페이지 load.
function openPopup() {
  var popupWindow = window.open('popup.html?id=' + obj.store_id, 'popup', 'width=400,height=680');
}

function receiveDataFromPopup(store_id) {
  console.log('부모 창에서 팝업 창으로부터 전달받은 데이터:', store_id);
}
function submit() {
  var storeName = document.getElementById('store_name').value;
  var storeDesc = document.getElementById('store_desc').value;
  var roadAddress = document.getElementById('sample4_roadAddress').value;
  var detailAddress = document.getElementById('sample4_detailAddress').value;
  var startTime = document.getElementById('store_time_start').value;
  var endTime = document.getElementById('store_time_end').value;
  var storeTel =
    document.getElementById('store_phone1').value +
    document.getElementById('store_phone2').value +
    document.getElementById('store_phone3').value;

  startTime = String(startTime);
  endTime = String(endTime);
  var formData = new FormData();
  const fileInput = document.getElementById("store_image")

  const storeRequestDto = {
    'storeName': storeName,
    'storeDesc': storeDesc,
    'startTime': startTime,
    'endTime': endTime,
    'roadAddress': roadAddress,
    'detailAddress': detailAddress,
    'storeTel': storeTel
 }


 formData.append('files', fileInput.files[0]);
 formData.append(
   'storeRequestDto',
   new Blob([JSON.stringify(storeRequestDto)], {
     type: 'application/json',
   })
 );
  console.log(obj)

  console.log(formData);
  const url = `http://127.0.0.1:8080/api/stores/${obj.store_id}`
  const token = localStorage.getItem('token');
  var teadbear = 'Bearer ' + token;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);

  fetch(url, {
    headers: myHeaders,
    body: formData,
    method: "PUT"
  })
    .then((response) => response.json())
    .then((result)=>console.log(result))
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });

  for (var pair of formData.entries()) {
    console.log(pair[1]);
  }

  // alert('수정이 완료되었습니다.');
  // location.reload();

}
