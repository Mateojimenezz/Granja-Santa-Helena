document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include" 
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      if (data.message === "Inicio de sesión exitoso") {
        localStorage.setItem("usuarioLogueado", "true");
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
funcion 
function regresar() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html'; // Cambia 'index.html' por la URL correcta de tu página de inicio
    }
}