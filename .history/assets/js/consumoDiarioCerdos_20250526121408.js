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
document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const editarExcelBtn = document.getElementById("editarExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");

    // Evento para actualizar el archivo Excel
    actualizarExcelBtn.addEventListener("click", function() {
        uploadExcel.click();
    });

    // Reemplazar el Excel con el nuevo archivo
    uploadExcel.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const url = URL.createObjectURL(archivo);
            editarExcelBtn.setAttribute("href", url);
            editarExcelBtn.setAttribute("download", "tabla_actualizada.xlsx");
        }
    });
});

