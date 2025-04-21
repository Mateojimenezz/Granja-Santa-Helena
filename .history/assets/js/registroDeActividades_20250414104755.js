
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

  // Función para el botón de generar reporte
  document.getElementById('generateReportButton').addEventListener('click', function () {
    alert('Reporte generado exitosamente.');
  });