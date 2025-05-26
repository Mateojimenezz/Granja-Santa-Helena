document.addEventListener("DOMContentLoaded", function() {
    const uploadExcel = document.getElementById("uploadExcel");
    const actualizarExcelBtn = document.getElementById("actualizarExcel");
    const editarExcelBtn = document.getElementById("editarExcel");

    if (actualizarExcelBtn && uploadExcel) {
        actualizarExcelBtn.addEventListener("click", function() {
            uploadExcel.click();
        });

        uploadExcel.addEventListener("change", function(event) {
            const archivo = event.target.files[0];
            if (archivo) {
                const url = URL.createObjectURL(archivo);

                if (editarExcelBtn) {
                    editarExcelBtn.setAttribute("href", url);
                    editarExcelBtn.setAttribute("download", archivo.name);
                } else {
                    console.error("❌ Error: No se encontró el botón 'editarExcel'. Verifica el HTML.");
                }
            }
        });
    } else {
        console.error("❌ Error: Elementos de actualización de Excel no encontrados.");
    }
});
