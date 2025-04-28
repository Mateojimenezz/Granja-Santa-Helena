
  // Función para filtrar la tabla
  document.addEventListener('DOMContentLoaded', function () {
    const filterDate = document.getElementById('filterDate');
    const filterUser = document.getElementById('filterUser');
    const filterActivity = document.getElementById('filterActivity');
    const tableBody = document.getElementById('tableBody');
    const noResults = document.getElementById('noResults');

    function filterTable() {
      const rows = tableBody.querySelectorAll('tr');
      let visibleRows = 0;

      rows.forEach(row => {
        const [dateCell, userCell, activityCell] = row.cells;
        const matchesDate = !filterDate.value || dateCell.textContent.includes(filterDate.value);
        const matchesUser = !filterUser.value || userCell.textContent.includes(filterUser.value);
        const matchesActivity = !filterActivity.value || activityCell.textContent.includes(filterActivity.value);

        if (matchesDate && matchesUser && matchesActivity) {
          row.style.display = ''; // Mostrar fila
          visibleRows++;
        } else {
          row.style.display = 'none'; // Ocultar fila
        }
      });

      noResults.style.display = visibleRows === 0 ? 'block' : 'none'; // Mostrar mensaje si no hay resultados
    }

    filterDate.addEventListener('change', filterTable);
    filterUser.addEventListener('change', filterTable);
    filterActivity.addEventListener('change', filterTable);
  });
//
  // Función para el botón de generar reporte
  document.getElementById('generateReportButton').addEventListener('click', function () {
    alert('Reporte generado exitosamente.');
  });
   // Función para generar el PDF
   document.getElementById('generateReportButton').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configuración de la tabla para el PDF
    doc.autoTable({
      html: '#activityTableContent', // Selección de la tabla HTML
      startY: 10, // Posición inicial en el PDF
      theme: 'grid', // Tema del diseño (grid, plain, striped)
      headStyles: { fillColor: [22, 160, 133] }, // Estilo para el encabezado
      margin: { top: 20 }, // Margen superior
    });

    // Guarda el PDF con un nombre específico
    doc.save('registro_actividades.pdf'); // Descarga el archivo
  });