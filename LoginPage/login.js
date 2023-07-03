let container = document.getElementById('container');

toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// // 서버 통신 로그인 구현

// function login() {
//   let username = document.getElementById('signInUsername').value;
//   let password = document.getElementById('signInPassword').value;

//   let loginData = {
//     username: username,
//     password: password,
//   };

//   // Send the login request
//   fetch('/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(loginData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response from the server
//       console.log(data);
//       // Additional login logic here
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// // 회원가입 로직
// function signUp() {
//   let password = document.getElementById('signUpPassword').value;
//   let confirmPassword = document.getElementById('confirmPassword').value;
//   let isAdmin = document.getElementById('adminCheck').checked;
//   let passwordError = document.getElementById('passwordError');

//   if (password !== confirmPassword) {
//     passwordError.textContent = '비밀번호가 일치하지 않습니다.';
//     return;
//   }

//   passwordError.textContent = '';

//   let signUpData = {
//     password: password,
//     isAdmin: isAdmin,
//   };

//   // Send the sign-up request
//   fetch('/api/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(signUpData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response from the server
//       console.log(data);
//       // Additional sign-up logic here
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }
