let container = document.getElementById('container');

toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// 로그인 기능
// Mock login functionality
function login() {
  const username = document.querySelector('#signInUsername').value;
  const password = document.querySelector('#signInPassword').value;

  const body = {
    username: username,
    password: password,
  };

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.httpStatus === 'OK') {
        const token = data.data;
        const decodedToken = decodeToken(token);

        // 로컬스토리지에 정보 저장
        localStorage.setItem('user', JSON.stringify(decodedToken));
        alert(data.message);

        // 메인페이지로 이동
        window.location.href = 'http://localhost:5501/main.html';
      } else {
        const message =
          data.message || '로그인 실패. 올바른 아이디와 비밀번호를 입력하세요.';
        alert(message);
        return null;
      }
    })
    .catch((error) => {
      console.error('로그인 요청에 실패하였습니다.', error);
      alert('로그인 요청에 실패하였습니다. 다시 시도해주세요.');
      return null;
    });
  // }

  // 아래와 같이 디코드하면 토큰의 만료, 발급시간을 나타내줌
  //{
  //   role: "USER",
  //   exp: 1688930616,
  //   iat: 1688927016,
  //   email: "johndoe@example.com"
  // }
  // 난생 처음 작성해본 코드라 맞는지 모르겠어요....
  function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
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
}

// 가상의 데이터
const mockData = {
  username: 'pmsu2008',
  email: 'pmsu2008@gmail.com',
  password: 'A123456789!',
  confirmPassword: 'A123456789!',
  isAdmin: true,
};
