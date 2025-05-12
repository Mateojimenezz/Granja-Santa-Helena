// assets/js/login.js
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
        fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta del servidor:", data); // Agregar un log para ver la respuesta
                if (data.message === "Inicio de sesión exitoso") {
                window.location.href = "paginaDeInicio.html";
                } else {
                alert(data.message);
                }
                })
                    .catch(error => {
                        alert(error.message);
                    });
      
    });
  });
  