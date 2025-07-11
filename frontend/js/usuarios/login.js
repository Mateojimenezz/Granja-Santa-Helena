document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // ✅ Validación básica antes del fetch
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos."
      });
      return;
    }

    // ✅ Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Ingrese un correo electrónico válido."
      });
      return;
    }

    // 🟢 Petición al backend
    fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error en el servidor");

        if (data.message === "Inicio de sesión exitoso") {
          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "Has iniciado sesión correctamente.",
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            localStorage.setItem("usuarioLogueado", "true");
            window.location.href = "seleccionarGranja.html";
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Inicio de sesión fallido",
            text: data.message
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar con el servidor: " + error.message
        });
      });
  });
});

/* función para el botón regresar */
function regresar() {
  window.location.href = "/frontend/index.html";
}
