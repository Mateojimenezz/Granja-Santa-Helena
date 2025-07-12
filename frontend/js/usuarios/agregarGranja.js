// Agregar Granja - frontend/js/usuarios/agregarGranja.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-granja");

    if (!form) {
        console.error("No se encontró el formulario.");
        return;
    }

    // Vista previa de la imagen
    document.getElementById("imagen").addEventListener("change", function (event) {
        const file = event.target.files[0];
        const preview = document.getElementById("preview");

        if (!file) {
            preview.style.display = "none";
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            preview.src = reader.result;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    });

    // Envío del formulario al backend
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("http://localhost:3000/api/usuarios/granjas", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ Mostrar mensaje y redirigir automáticamente después de 2 segundos
                Swal.fire({
                    icon: 'success',
                    title: 'Granja agregada correctamente',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        console.log("✅ MOSTRANDO MENSAJE DE ÉXITO");
                    }
                });

                // ✅ Redirigir manualmente después de un pequeño retraso (garantizado)
                setTimeout(() => {
                    console.log("🔁 REDIRIGIENDO A seleccionarGranja.html");
                    window.location.href = "/frontend/pages/usuarios/seleccionarGranja.html";
                }, 2100); // 100 ms después del timer para evitar conflicto
            } else {
                console.error("❌ Error al guardar la granja:", result);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: result.message || "Error desconocido"
                });
            }

        } catch (error) {
            console.error("❌ Error al conectar con el servidor:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: "No se pudo conectar con el servidor."
            });
        }
    });
});
