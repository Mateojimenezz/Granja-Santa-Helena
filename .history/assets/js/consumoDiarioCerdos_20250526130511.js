document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");
    const editarExcelBtn = document.querySelector("a[download='TABLA DE CONSUMO DIARIO.xlsx']");

    const uploadImagen = document.getElementById("uploadImagen");
    const actualizarImagenBtn = document.getElementById("actualizarImagen");
    const tablaImagen = document.getElementById("tablaImagen");

    // 🔥 Evento para actualizar el archivo Excel
    actualizarExcelBtn.addEventListener("click", function() {
        uploadExcel.click();
    });

    uploadExcel.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const url = URL.createObjectURL(archivo);
            editarExcelBtn.setAttribute("href", url);
            editarExcelBtn.setAttribute("download", "TABLA DE CONSUMO DIARIO.xlsx");
        }
    });

    // 🔥 Evento para actualizar la imagen
    actualizarImagenBtn.addEventListener("click", function() {
        uploadImagen.click();
    });

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
