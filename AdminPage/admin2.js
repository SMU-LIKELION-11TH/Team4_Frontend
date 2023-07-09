const obj = {
  imageSrc: "",
  store_desc: "",
  store_roadAddress: "",
  store_detailAddress: "",
  store_time_start: "",
  store_time_end: "",
  store_phone: ""
};
function addPlaceholder(elementId, placeholderText) {
  var element = document.getElementById(elementId);
    element.placeholder = placeholderText;
}
function addPlaceholders() {
  addPlaceholder("store_name","점포명");
  addPlaceholder("store_desc","점포설명$%$%$%$%$%");
  addPlaceholder("sample4_roadAddress","입력된 도로명주소");
  addPlaceholder("sample4_jibunAddress","입력된 지번주소");
  addPlaceholder("sample4_detailAddress","입력된 상세주소");
  addPlaceholder("store_phone1","010");
  addPlaceholder("store_phone2","1234");
  addPlaceholder("store_phone3","5678");
  var imageElement = document.getElementById("image_element")
  imageElement.setAttribute("src","../img/3.jpeg");
}
window.addEventListener("load", addPlaceholders);

function loadFile(event){
  console.log("file load");
  var reader = new FileReader();
  reader.onload = function(event){
    var img = document.createElement("img");
    img.setAttribute("src",event.target.result);
    img.style.width = "150px"; // 이미지의 가로 크기를 100px로 설정
    img.style.height = "150px"; // 이미지의 세로 크기를 100px로 설정
    var image_container = document.getElementById("image_container");
    image_container.innerHTML = ''
    image_container.appendChild(img);

    var storeImageBox = document.querySelector('.store_image_box');

    obj.imageSrc = img;
  }
  reader.readAsDataURL(event.target.files[0]);
}



function sample4_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
              extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
             extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraRoadAddr !== ''){
              extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample4_postcode').value = data.zonecode;
          document.getElementById("sample4_roadAddress").value = roadAddr;
          document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
          
          // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
          if(roadAddr !== ''){
              document.getElementById("sample4_extraAddress").value = extraRoadAddr;
          } else {
              document.getElementById("sample4_extraAddress").value = '';
          }

          var guideTextBox = document.getElementById("guide");
          // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
          if(data.autoRoadAddress) {
              var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
              guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
              guideTextBox.style.display = 'block';

          } else if(data.autoJibunAddress) {
              var expJibunAddr = data.autoJibunAddress;
              guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
              guideTextBox.style.display = 'block';
          } else {
              guideTextBox.innerHTML = '';
              guideTextBox.style.display = 'none';
          }
      }
  }).open();
}

function submit(){
  var store_name = document.getElementById("store_name").value;
  var store_desc = document.getElementById("store_desc").value;
  var store_roadAddress= document.getElementById("sample4_roadAddress").value;
  var sample4_jibunAddress = document.getElementById("sample4_jibunAddress").value;
  var store_detailAddress = document.getElementById("sample4_detailAddress").value;
  var store_select = document.getElementById('store_select').value;
  var store_time_start = document.getElementById('store_time_start').value;
  var store_time_end = document.getElementById('store_time_end').value;
  var store_phone = document.getElementById('store_phone1').value+document.getElementById('store_phone2').value+document.getElementById('store_phone3').value;
  
  store_time_start = String(store_time_start);
  store_time_end = String(store_time_end);
  // obj.store_name = store_name;
  // obj.store_desc = store_desc;
  // obj.store_roadAddress = store_roadAddress;
  // obj.store_detailAddress = store_detailAddress;
  // obj.store_select = store_select;
  // obj.store_time_start = store_time_start;
  // obj.store_time_end = store_time_end;
  // obj.store_phone = store_phone;

  var formData = new FormData();


  formData.append('store_name', store_name);
  formData.append('store_desc', store_desc);
  formData.append('store_image', obj.store_image);
  formData.append(
    "key",
    new Blob([JSON.stringify(obj.store_image.info)], { type: "application/json" })
  );
  formData.append('store_roadAddress', store_roadAddress);
  formData.append('store_detailAddress', store_detailAddress);
  formData.append('store_select', store_select);
  formData.append('store_time_start', store_time_start);
  formData.append('store_time_end', store_time_end);
  formData.append('store_phone', store_phone);
  // $.ajax({
  //   type:'POST',
  //   url : 'http://127.0.0.1:8000/api/stores',
  //   contentType : 'application/json',
  //   headers:{
  //       'X-CSRFToken' : getCookie('csrftoken')
  //   },
  //   data:formData,
  //   success: function(data){
  //     if(data.code === 200 && data.httpStatus === "OK"){
  //       alert("생성에 성공하였습니다.")
  //     }
  //   },
  //   error: function(request, status, error) {
  //     if (request.status === "Bad Request" && error === 400) {
  //         alert("잘못된 요청입니다.");
  //     } else if(request.status === "Forbidden" && error === 403){
  //         alert("권한이 없습니다.");
  //     }
  // }
    

  // })
  for (var pair of formData.entries()) {
    console.log(pair[1]);
    }
  alert("수정이 완료되었습니다.");
  location.reload();
}

