document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const editarExcelBtn = document.getElementById("editarExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");
    const exportarPDFBtn = document.getElementById("exportarPDF");
    const tablaImagen = document.getElementById("tablaImagen");

    // 🔥 Solución para abrir el archivo Excel correctamente
    editarExcelBtn.addEventListener("click", function() {
        window.open("tabla.xlsx"); // Abre el archivo correctamente
    });

    // 🔥 Evento para subir nuevo archivo Excel
    actualizarExcelBtn.addEventListener("click", function() {
        uploadExcel.click();
    });

    uploadExcel.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const url = URL.createObjectURL(archivo);
            editarExcelBtn.setAttribute("href", url);
            editarExcelBtn.setAttribute("download", "tabla_actualizada.xlsx");
        }
    });

    // 🔥 Generación de PDF con la imagen actualizada
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
