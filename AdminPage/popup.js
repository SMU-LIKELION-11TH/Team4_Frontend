const obj = {
    imageUrl:"",
    menuName:"",
    menuPrice:0,
    menuDesc:"",
    store_id:0
  };
  window.onload=function(){
    var receiveData = window.dataFromParent;
    console.log(receiveData);
    obj.store_id = receiveData;
  }
function enroll(event){
  event.preventDefault();
  console.log("enroll");
    var formData = new FormData();

    var menuName = document.getElementById("menu_name").value;
    var menuPrice = document.getElementById("menu_price").value;
    var menuDesc= document.getElementById("menu_desc").value;

    formData.append('menuName', menuName);
    formData.append('menuPrice', menuPrice);
    formData.append('menuDesc', menuDesc);
    formData.append(
        "key",
        new Blob([JSON.stringify(obj.imageUrl.info)], { type: "application/json" })
    );
    for (var pair of formData.entries()) {
        console.log(pair[1]);
    }
    console.log(formData)
    // $.ajax({
    //     type:'POST',
    //     url : 'http://127.0.0.1:8000/api/stores{obj.store_id}/menus',
    //     contentType : 'application/json',
    //     headers:{
    //         'X-CSRFToken' : getCookie('csrftoken')
    //     },
    //     data:formData,
    //     success: function(data){
    //       if(data.code === 200 && data.httpStatus === "OK"){
    //         alert("생성에 성공하였습니다.")
    //       }
    //     },
    //     error: function(request, status, error) {
    //       if (request.status === "Bad Request" && error === 400) {
    //           alert("잘못된 요청입니다.");
    //       } else if(request.status === "Forbidden" && error === 403){
    //           alert("권한이 없습니다.");
    //       }
    //   }
        
    
    //   })
    // Ajax 요청이 완료되면 페이지를 자동닫기. 안되면 수동닫기.
    // setTimeout(function() {
    //     window.close();
    // }, 2000);
}

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
  
      var menuImageBox = document.querySelector('.menu_image_box');
  
      obj.imgSrc = img;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  