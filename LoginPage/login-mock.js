const container = document.getElementById('container');

const toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// Mock login functionality
function login() {
  const id = document.querySelector('#signInUsername').value;
  const password = document.querySelector('#signInPassword').value;

  // Check if the entered credentials match the mock data
  if (id === mockData.username && password === mockData.password) {
    // Simulate a successful login response
    const data = {
      code: 200,
      httpStatus: 'OK',
      message: '요청에 성공하였습니다.',
      data: {
        id: 1,
        email: 'admin',
        nickname: 'admin',
        role: 'USER',
        imageUrl: null,
        createdAt: '2023-07-09T00:08:59.474536',
        updatedAt: '2023-07-09T00:08:59.474536',
      },
    };

    // 로컬스토리지에 정보저장
    localStorage.setItem('user', JSON.stringify(data.data));
    alert(data.message);

    // 메인페이지로 이동
    window.location.href = '../main.html';
  } else {
    // 로그인 실패
    const data = {
      success: false,
      message: '로그인 실패. 올바른 아이디와 비밀번호를 입력하세요.',
    };

    alert(data.message);
    return null;
  }
}

// 회원가입
function signUp() {
  const username = document.getElementById('signUpUsername').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const isAdmin = document.getElementById('adminCheck').checked;

  const role = isAdmin ? 'CEO' : 'USER';

  // 회원가입 성공
  const data = {
    success: true,
    message: '회원가입 성공',
    data: {
      id: username,
      username: username,
      email: email,
      role: role,
    },
  };

  alert(data.message);
}

// Mock data
const mockData = {
  username: '123',
  email: 'pmsu2008@gmail.com',
  password: '123',
  confirmPassword: '123',
  isAdmin: true,
};
