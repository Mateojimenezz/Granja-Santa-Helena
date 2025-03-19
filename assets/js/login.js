document.addEventListener("DOMContentLoaded", function () {
     const loginForm = document.getElementById("login-form");
 
     loginForm.addEventListener("submit", function (event) {
         event.preventDefault();
 
         const email = document.getElementById("email").value;
         const password = document.getElementById("password").value;
 
         if (email === "admin@example.com" && password === "123456") {
             alert("Inicio de sesión exitoso");
             window.location.href = "dashboard.html";
         } else {
             alert("Correo o contraseña incorrectos");
         }
     });
 });
 