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
        console.log("Respuesta del servidor:", data);
        if (data.message === "Inicio de sesión exitoso") {
          // 🔐 Guardar estado de sesión
          localStorage.setItem("usuarioLogueado", "true");
          // Redirigir a la página de inicio
          window.location.href = "paginaDeInicio.html";
        } else {
          alert(data.message);
        }
        
      })
      .catch(error => {
        alert("Error en la solicitud: " + error.message);
      });
  });
});
