document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");
    const editarExcelBtn = document.getElementById("editarExcel");

    const uploadImagen = document.getElementById("uploadImagen");
    const actualizarImagenBtn = document.getElementById("actualizarImagen");
    const tablaImagen = document.getElementById("tablaImagen");

    // 🔥 Evento para subir nuevo archivo Excel
    actualizarExcelBtn.addEventListener("click", function() {
        uploadExcel.click();
    });

    uploadExcel.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem("archivoExcel", e.target.result); // Guardamos el archivo en localStorage
                editarExcelBtn.href = e.target.result;
                editarExcelBtn.download = archivo.name;
            };
            reader.readAsDataURL(archivo);
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
                localStorage.setItem("tablaImagen", e.target.result); // Guardamos la imagen en localStorage
                tablaImagen.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });

    // 🔥 Cargar imagen almacenada si existe
    const imagenGuardada = localStorage.getItem("tablaImagen");
    if (imagenGuardada) {
        tablaImagen.src = imagenGuardada;
    }

    // 🔥 Cargar archivo Excel almacenado si existe
    const archivoGuardado = localStorage.getItem("archivoExcel");
    if (archivoGuardado) {
        editarExcelBtn.href = archivoGuardado;
        editarExcelBtn.download = "tabla_actualizada.xlsx";
    }
});

