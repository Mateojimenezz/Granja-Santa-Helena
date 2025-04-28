// Objeto con las categorías y sus tipos asociados
const categoriasYTipos = {
    alimentacion: [
      "Tolvas",
      "Bebederos automáticos",
      "Contenedores de alimentos"
    ],
    limpieza: [
      "Hidrolavadoras",
      "Escobas industriales",
      "Productos químicos",
      "Baldes y mangueras"
    ],
    cuidado: [
      "Jaulas de manejo",
      "Termómetros",
      "Kits de primeros auxilios",
      "Esquiladoras"
    ],
    mantenimiento: [
      "Martillos",
      "Alicates",
      "Destornilladores",
      "Materiales de reparación"
    ]
  };
  
  // Función para actualizar los tipos según la categoría seleccionada
  document.addEventListener('change', function (event) {
    if (event.target.classList.contains('categoria-select')) {
      const categoriaSeleccionada = event.target.value;
      const fila = event.target.closest('tr'); // Obtener la fila actual
      const tipoSelect = fila.querySelector('.tipo-select'); // Campo de Tipo
  
      // Limpiar las opciones del campo de Tipo
      tipoSelect.innerHTML = '<option selected disabled>Seleccionar Tipo</option>';
  
      // Añadir las opciones correspondientes a la categoría seleccionada
      if (categoriasYTipos[categoriaSeleccionada]) {
        categoriasYTipos[categoriaSeleccionada].forEach(tipo => {
          const option = document.createElement('option');
          option.value = tipo.toLowerCase(); // Valor en minúsculas
          option.textContent = tipo; // Texto mostrado
          tipoSelect.appendChild(option);
        });
      }
    }
  });
  // Función para añadir una nueva fila a la tabla
 const addUserButton = document.getElementById('addUserButton');
 const userTableBody = document.querySelector('#userTable tbody');
 

 addUserButton.addEventListener('click', function () {
   const newRow = document.createElement('tr');

   newRow.innerHTML = `

   `;

   userTableBody.appendChild(newRow);
 });
 // Función para eliminar la fila seleccionada o la última fila si no hay ninguna seleccionada
 deleteUserButton.addEventListener('click', function () {
    // Buscar filas seleccionadas
    const selectedRows = Array.from(document.querySelectorAll('#userTable tbody tr')).filter(row => {
      const checkbox = row.querySelector('.form-check-input');
      return checkbox && checkbox.checked;
    });

    if (selectedRows.length > 0) {
      // Eliminar las filas seleccionadas
      selectedRows.forEach(row => row.remove());
    } else {
      // Si no hay filas seleccionadas, eliminar la última fila
      const rows = document.querySelectorAll('#userTable tbody tr');
      if (rows.length > 0) {
        rows[rows.length - 1].remove();
      }
    }
  });
 
  printButton.addEventListener('click', function () {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Obtener las filas de la tabla
    const rows = document.querySelectorAll('#userTable tbody tr');
  
    // Actualizar la columna "Seleccionar" con "ON" o "OFF" según el estado de los checkboxes
    rows.forEach(row => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const seleccionarCell = row.children[0]; // Columna "Seleccionar"
  
      // Cambiar el texto según el estado del checkbox
      if (checkbox.checked) {
        seleccionarCell.textContent = 'OFF';
      } else {
        seleccionarCell.textContent = 'ON';
      }
    });
  
    // Configuración de autoTable para generar PDF
    const table = document.getElementById('userTable');
    doc.autoTable({
      head: [['Seleccionar', 'Fecha', 'Lote', 'Categoría', 'Tipo de Alimento', 'Cantidad de Salida', 'Destino', 'Responsable']], // Encabezados
      body: Array.from(table.querySelectorAll('tbody tr')).map(row => {
        return Array.from(row.cells).map(cell => {
          const input = cell.querySelector('input, select');
          return input ? (input.value || input.options[input.selectedIndex]?.text) : cell.textContent.trim();
        });
      }),
      theme: 'grid', // Tema opcional de tabla
      startY: 20, // Define el punto inicial Y para la tabla
    });
  
    // Guardar como archivo PDF
    doc.save('Registro_de_Consumo_Diario_de_Alimentos.pdf'); // Nombre del archivo
  
    // Restaurar el checkbox y texto original después de generar el PDF
    rows.forEach(row => {
      const seleccionarCell = row.children[0];
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input';
  
      // Si antes estaba "OFF", marcar el checkbox
      if (seleccionarCell.textContent === 'OFF') {
        checkbox.checked = true;
      }
  
      // Restaurar la celda a su contenido original (checkbox)
      seleccionarCell.textContent = '';
      seleccionarCell.appendChild(checkbox);
    });
  });
  
  