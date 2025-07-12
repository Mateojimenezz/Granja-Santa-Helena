document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: 'Correo inválido',
        text: 'Ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    })
      .then(async response => {
        const data = await response.json();
        console.log("🧪 DATA RECIBIDA:", data);
        console.log("🧪 USUARIO RECIBIDO:", data.user);

        if (!response.ok) throw new Error(data.message || "Error en el servidor");

        if (data.user && data.user.id) {
          console.log("✅ BLOQUE DE REDIRECCIÓN EJECUTADO");
          localStorage.setItem("usuario", JSON.stringify(data.user));
          localStorage.setItem("usuarioLogueado", "true");

          // ✅ Alerta bonita de inicio exitoso
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "seleccionarGranja.html";
          });

        } else {
          console.log("❌ BLOQUE DE REDIRECCIÓN NO EJECUTADO");
          Swal.fire({
            title: 'Error',
            text: '⚠️ Datos de usuario incompletos. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: '❌ ' + error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  });
});
