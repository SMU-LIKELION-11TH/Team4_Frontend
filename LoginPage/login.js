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
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success == true) {
        alert(data.message);
        // Save user information and token in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('token', data.token);
        // Redirect to main page
        window.location = 'http://example.com/main.html';
      } else {
        alert(data.message);
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

  fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success == true) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = '/LoginPage/login.html';
      } else {
        alert(data.message);
      }
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

// API 요청에 인증 토큰을 추가하는 함수
function addAuthorizationHeader(headers) {
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  return headers;
}

// 예시 API 요청
function exampleApiRequest() {
  const url = 'http://localhost:8080/api/example';
  fetch(url, {
    method: 'GET',
    headers: addAuthorizationHeader({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // 처리할 로직 작성
    })
    .catch((error) => {
      console.error('API 요청 에러:', error);
    });
}
