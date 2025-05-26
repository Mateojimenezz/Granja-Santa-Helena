document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
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
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = passwordInput.value.trim();

        if (!name || !email || !password) {
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

        alert("Registro exitoso");

        // ✅ Redirigir a la página de inicio de sesión
        window.location.href = "login.html"; // Ajusta el nombre de la página si es diferente

        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    }
});
