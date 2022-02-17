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
