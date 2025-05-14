document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-granja");

    if (!form) {
        console.error("No se encontró el formulario.");
        return;
    }


    // ✅ Evento para agregar la granja y redirigir a `seleccionarGranja.html`
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombreGranja = document.getElementById("nombre").value;
        const urlImagen = document.getElementById("preview").src;

        if (!nombreGranja || !urlImagen) {
            alert("Por favor, ingresa el nombre y sube una imagen.");
            return;
        }

        // 🌟 Depuración: Ver contenido antes de guardar
        console.log("Nombre de la granja:", nombreGranja);
        console.log("Imagen de la granja:", urlImagen);

        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });

        try {
            localStorage.setItem("granjas", JSON.stringify(granjas));
            console.log("Granja guardada correctamente.");
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al guardar la granja.");
            return;
        }

        alert("Granja agregada correctamente!");
        window.location.href = "seleccionarGranja.html"; // 🌟 Cambio: Usar `href` en lugar de `assign`
    });
});


