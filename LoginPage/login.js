let container = document.getElementById('container');

toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// Mock 데이터
const mockUserData = {
  username: 'user123',
  email: 'user123@example.com',
  password: 'password123',
};

// 로그인 함수
function login() {
  // 입력된 사용자명과 비밀번호 가져오기
  const username = document.querySelector('.sign-in input[type="text"]').value;
  const password = document.querySelector(
    '.sign-in input[type="password"]'
  ).value;

  // 입력값과 Mock 데이터 비교 (case-insensitive)
  if (
    username.toLowerCase() === mockUserData.username.toLowerCase() &&
    password === mockUserData.password
  ) {
    // 로그인 성공
    alert('로그인 성공!');
    // 로그인 후 실행할 코드 작성
  } else {
    // 로그인 실패
    alert('로그인 실패. 사용자명 또는 비밀번호가 올바르지 않습니다.');
  }
}

// 회원가입 함수
function signUp() {
  // 입력된 사용자명, 이메일, 비밀번호 가져오기
  const username = document.querySelector(
    '.sign-up input[placeholder="사용자명"]'
  ).value;
  const email = document.querySelector(
    '.sign-up input[placeholder="이메일"]'
  ).value;
  const password = document.querySelector(
    '.sign-up input[placeholder="비밀번호"]'
  ).value;
  const confirmPassword = document.querySelector(
    '.sign-up input[placeholder="비밀번호 확인"]'
  ).value;

  // 입력값 유효성 검사
  if (username && email && password && confirmPassword) {
    if (password === confirmPassword) {
      // 회원가입 성공
      alert('회원가입 성공!');
      // 회원가입 후 실행할 코드 작성
    } else {
      // 비밀번호 확인 불일치
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else {
    // 필수 입력값 누락
    alert('모든 필드를 입력해주세요.');
  }
}
