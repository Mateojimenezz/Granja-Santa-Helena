document.addEventListener('DOMContentLoaded', function () {
    console.log('Script cargado');

    const button = document.getElementById('sendButton');
    const successMessage = document.getElementById('successMessage');
    const cerrarFormulario = document.getElementById("cerrar-formulario");

    // Redirige a login al cerrar el formulario
    if (cerrarFormulario) {
        cerrarFormulario.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    }

    if (button) {
        button.addEventListener('click', function () {
            const email = document.getElementById('email').value.trim();

            if (!email) {
                alert("Por favor ingresa un correo válido.");
                return;
            }

            // Enviar al backend
            fetch("http://localhost:3000/api/recuperar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        successMessage.classList.remove('d-none');
                        setTimeout(() => {
                            successMessage.classList.add('d-none');
                        }, 5000);
                    } else {
                        alert(data.message || "No se pudo enviar el correo.");
                    }
                })
                .catch(error => {
                    console.error("Error en la solicitud:", error);
                    alert("Error al enviar el correo.");
                });
        });
    } else {
        console.error('El botón no se encontró en el DOM.');
    }
});
