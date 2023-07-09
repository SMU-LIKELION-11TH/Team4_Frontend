let container = document.getElementById('container');

toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// 로그인 기능
function login() {
  const id = document.querySelector('#signInUsername').value;
  const password = document.querySelector('#signInPassword').value;

  const data = {
    id: id,
    password: password,
  };

  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success == true) {
        alert(data.message);
        // Save user information in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        window.location = 'http://127.0.0.1:5500/html/main.html';
      } else {
        alert(data.message);
        return null;
      }
    });
}

// 회원가입
function signUp() {
  const username = document.getElementById('signUpUsername').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const isAdmin = document.getElementById('adminCheck').checked;

  const role = isAdmin ? 'CEO' : 'USER';

  const data = {
    email: email,
    password: password,
    nickname: username,
    role: role,
  };

  $.ajax({
    type: 'POST',
    url: '/api/register',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (response) {
      // 회원가입 성공 시 처리 로직
      console.log('회원가입 성공:', response);
      window.location.href = '/LoginPage/login.html';
    },
    error: function (error) {
      // 회원가입 실패 시 처리 로직
      console.log('회원가입 실패:', error);
      window.location.href = '/LoginPage/login.html';
    },
  });
}

// 가상의 데이터
const mockData = {
  username: 'pmsu2008',
  email: 'pmsu2008@gmail.com',
  password: 'A123456789!',
  confirmPassword: 'A123456789!',
  isAdmin: true,
};
