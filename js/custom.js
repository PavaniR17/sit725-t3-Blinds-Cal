M.AutoInit();
 
 document.addEventListener('DOMContentLoaded', function() {
    //var elems = document.querySelectorAll('.carousel');
    var instance = M.Carousel.init({
        numVisible: 2,
        indicators: true
    });
  });


//login form validation

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");


loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;


  if (username === "admin" && password === "blinds") {

    redirectUser();

  } else {

      loginErrorMsg.style.display = "block";

  }

});

function redirectUser(){

  window.location.assign("http://127.0.0.1:5500/index.html");

}