// Este script se encarga de imprimir la tabla de usuarios en formato PDF
  const printButton = document.getElementById('printButton');
  printButton.addEventListener('click', function () {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener los datos de la tabla
    const table = document.getElementById('userTable');
    doc.autoTable({
      head: [['Seleccionar', 'Nombre', 'Identificación', 'Email', 'Teléfono', 'Rol', 'Asignar Permisos']], // Encabezados
      body: Array.from(table.querySelectorAll('tbody tr')).map(row => {
        return Array.from(row.cells).map(cell => {
          const input = cell.querySelector('input, select');
          return input ? input.value || input.options[input.selectedIndex]?.text : cell.textContent.trim();
        });
      }),
    });

    // Guardar como archivo PDF
    doc.save('tabla_usuarios.pdf'); // Nombre del archivo
  });