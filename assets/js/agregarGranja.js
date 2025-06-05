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
            const response = await fetch("http://localhost:3000/api/granjas", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Granja agregada correctamente.");
                console.log("➡️ Redirigiendo a seleccionarGranja.html...");
                window.location.href = "/seleccionarGranja.html";
            } else {
                console.error("❌ Error al guardar la granja:", result);
                alert("❌ Error al guardar la granja.");
            }

        } catch (error) {
            console.error("❌ Error al conectar con el servidor:", error);
            alert("❌ No se pudo conectar con el servidor.");
        }
    });
});
