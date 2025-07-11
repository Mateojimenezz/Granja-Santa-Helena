// assets/js/register.js
console.log("register.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", function () {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("nombre").value.trim();
        const identification = document.getElementById("identificacion").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("telefono").value.trim();
        const role = document.getElementById("cargo").value.trim();
        const password = passwordInput.value.trim();

        if (!name || !identification || !email || !phone || !role || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        }

        if (!validatePassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
            return;
        }

        const formData = { name, identification, email, phone, role, password };

        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }

                // Alerta bonita con SweetAlert2
                Swal.fire({
                    title: '¡Usuario registrado!',
                    text: '¿Desea ir a la página de inicio de sesión?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, ir ahora',
                    cancelButtonText: 'No, más tarde'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'login.html'; // Ajusta esta ruta según corresponda
                    }
                });

                form.reset();
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo registrar el usuario: ' + error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    }
});
