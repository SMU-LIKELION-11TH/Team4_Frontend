// 로그인 로직은 건들이시면 안됩니다.
document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});
s
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


const obj = {
  storeIamgeUrl: '',
  imageUrl: '',
  storeName: '',
  storeDesc: '',
  roadAddress: '',
  detailAddress: '',
  startTime: '',
  endTime: '',
  storeTel: '',
  categoryName: '',
  nickname: '!@##$',
};

function onLoad() {
  var url = "http://127.0.0.1:8080/api/stores"+obj.store_id

  fetch(url, {
    headers: myHeaders,
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then(data => {
      
      obj.storeIamgeUrl=storeIamgeUrl;
      obj.imageUrl=imageUrl;
      obj.storeDesc=storeDesc;
      obj.roadAddress=roadAddress;
      obj.detailAddress=detailAddress;
      obj.startTime=startTime;
      obj.endTime=endTime;
      obj.storeTel=storeTel;
      obj.categoryName=categoryName;
      obj.nickname=nickname;

      console.log(data);
    })
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });

  // fetchMenuList();
  var imageElement = document.getElementById('image_element');
  imageElement.setAttribute('src', obj.storeIamgeUrl);
  var ownerImg = document.getElementById('owner-img');
  // ownerImg.setAttribute("src",obj.imageUrl);

  var element = document.getElementById('owner-nickname');
  element.textContent = obj.nickname;
}
// function fetchMenuList() {
//   $.ajax({
//     type: 'GET',
//     url: 'http://127.0.0.1:8080/api/stores{obj.store_id}/menus',
//     contentType: 'application/json',
//     success: function (data) {
//       if (data.code === 200 && data.httpStatus === 'OK') {
//         alert('생성에 성공하였습니다.');
//         displayMenuList(data);
//       }
//     },
//     error: function (request, status, error) {
//       if (request.status === 'Bad Request' && error === 400) {
//         alert('잘못된 요청입니다.');
//       } else if (request.status === 'Forbidden' && error === 403) {
//         alert('권한이 없습니다.');
//       }
//     },
//   });
// }

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

function submit() {
  var storeName = document.getElementById('store_name').value;
  var storeDesc = document.getElementById('store_desc').value;
  var roadAddress = document.getElementById('sample4_roadAddress').value;
  var detailAddress = document.getElementById('sample4_detailAddress').value;
  var categoryName = document.getElementById('store_select').value;
  var startTime = document.getElementById('store_time_start').value;
  var endTime = document.getElementById('store_time_end').value;
  var storeTel =
    document.getElementById('store_phone1').value +
    document.getElementById('store_phone2').value +
    document.getElementById('store_phone3').value;

  startTime = String(startTime);
  endTime = String(endTime);
  const fileInput = document.getElementById("store_image")
  
  const storeRequestDto = {
    'storeName': storeName,
    'storeDesc': storeDesc,
    'startTime': startTime,
    'endTime': endTime,
    'roadAddress': roadAddress,
    'detailAddress': detailAddress,
    'storeTel': storeTel,
    'categoryName': categoryName
 }
 console.log(categoryName)

 const formData = new FormData();

 formData.append('files', fileInput.files[0]);
  formData.append(
    'storeRequestDto',
    new Blob([JSON.stringify(storeRequestDto)], {
      type: 'application/json',
    })
  );

  console.log(formData);
  const url = 'http://127.0.0.1:8080/api/stores';
  const token = localStorage.getItem('token');
  var teadbear = 'Bearer ' + token;
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);

  fetch(url, {
    headers: myHeaders,
    body: formData,
    method: "POST"
  })
    .then((response) => response.json())
    .then((result)=>console.log(result))
    .catch((error) => {
      console.error('An error occurred while loading store data:', error);
    });

  for (var pair of formData.entries()) {
    console.log(pair[1]);
  }
  alert('등록이 완료되었습니다.');  
  location.reload();
}