let container = document.getElementById('container');

toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// Login functionality
function login() {
  const email = document.querySelector('#signInUsername').value;
  const password = document.querySelector('#signInPassword').value;

  const data = {
    email: email,
    password: password,
  };

  fetch('http://127.0.0.1:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = '/main.html';
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('token', data.data.jwt);
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('An error occurred during login:', error);
    });
}

// 회원가입
function signUp() {
  console.log('hi');
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

  fetch('http://127.0.0.1:8080/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
        window.location.href = "/LoginPage/login.html";
      if (data.success == true) {
        alert('회원가입이 완료되었습니다.');
     
      } else {
        alert(data.message);
      }
    });
}

