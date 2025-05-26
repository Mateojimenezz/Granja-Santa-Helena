document.addEventListener("DOMContentLoaded", function() {
    const uploadImagen = document.getElementById("uploadImagen");
    const tablaImagen = document.getElementById("tablaImagen");
    const actualizarImagenBtn = document.getElementById("actualizarImagen");

    // Evento para seleccionar nueva imagen
    actualizarImagenBtn.addEventListener("click", function() {
        uploadImagen.click();
    });

    // Evento para cambiar la imagen cuando se carga un nuevo archivo
    uploadImagen.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                tablaImagen.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });
});

