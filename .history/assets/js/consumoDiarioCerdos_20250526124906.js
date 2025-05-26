document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const editarExcelBtn = document.getElementById("editarExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");

    // Evento para subir nuevo archivo Excel
    actualizarExcelBtn.addEventListener("click", function() {
        uploadExcel.click();
    });

    uploadExcel.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem("archivoExcel", e.target.result); // Guardamos el archivo en localStorage
                editarExcelBtn.href = e.target.result; // Usamos el archivo guardado
                editarExcelBtn.download = "tabla_actualizada.xlsx";
            };
            reader.readAsDataURL(archivo);
        }
    });

    // Cargar archivo Excel guardado si existe
    const archivoGuardado = localStorage.getItem("archivoExcel");
    if (archivoGuardado) {
        editarExcelBtn.href = archivoGuardado;
        editarExcelBtn.download = "";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const exportarPDFBtn = document.getElementById("exportarPDF");
    const tablaImagen = document.getElementById("tablaImagen");

    exportarPDFBtn.addEventListener("click", function() {
        if (!tablaImagen.src.includes("data:image")) {
            alert("Por favor, actualiza la imagen antes de exportar a PDF.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.addImage(tablaImagen.src, 'JPEG', 10, 10, 180, 120);
        doc.save("tabla_consumo.pdf");
    });
});
