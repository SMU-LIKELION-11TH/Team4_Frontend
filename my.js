document.querySelector('.login-button').addEventListener('click', function () {
  window.location.href = '../LoginPage/login.html';
});

var imageInput = document.getElementById('image');
var profileImage = document.getElementById('profileimg');

imageInput.addEventListener('change', function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
  profileImage.src = e.target.result;
};

reader.readAsDataURL(file);
});