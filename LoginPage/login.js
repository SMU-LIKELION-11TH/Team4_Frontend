let container = document.getElementById("container");

toggle = () => {
  container.classList.toggle("sign-in");
  container.classList.toggle("sign-up");
};

setTimeout(() => {
  container.classList.add("sign-in");
}, 200);

// 로그인 기능
function login() {
  const email = document.querySelector("#signInUsername").value;
  const password = document.querySelector("#signInPassword").value;

  const data = {
    email: email,
    password: password,
  };

  fetch("http://127.0.0.1:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    window.location.href ='http://127.0.0.1:5500/main.html';
    if (data.success == true) {
      alert(data.message);
      // Save user information and token in localStorage
      // localStorage.setItem('user', JSON.stringify(data.data));
      // localStorage.setItem('token', data.token);
      // Redirect to main page
    }
  });
}

// 회원가입
function signUp() {
  console.log("hi");
  const username = document.getElementById("signUpUsername").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const isAdmin = document.getElementById("adminCheck").checked;

  const role = isAdmin ? "CEO" : "USER";

  const data = {
    email: email,
    password: password,
    nickname: username,
    role: role,
  };

  fetch("http://127.0.0.1:8080/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      console.log(response.json());
      response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.success == true) {
        alert("회원가입이 완료되었습니다.");
        // window.location.href = "/LoginPage/login.html";
      } else {
        alert(data.message);
      }
    });
}

// // API 요청에 인증 토큰을 추가하는 함수
// function addAuthorizationHeader(headers) {
//   const token = localStorage.getItem('token');
//   if (token) {
//     headers['Authorization'] = 'Bearer ' + token;
//   }
//   return headers;
// }

// // 예시 API 요청
// function exampleApiRequest() {
//   const url = 'http://localhost:8080/api/example';
//   fetch(url, {
//     method: 'GET',
//     headers: addAuthorizationHeader({
//       'Content-Type': 'application/json',
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // 처리할 로직 작성
//     })
//     .catch((error) => {
//       console.error('API 요청 에러:', error);
//     });
// }

// 1. 로그인 id / pw 보내고
// 2. 백엔드에서 토큰을 받고
// 3. 다시 토큰을 보냄 => response
