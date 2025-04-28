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
            <td>
                <input type="checkbox" class="form-check-input" />
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Codigo-Verraco" />
                </td>
              <td>
                <input type="date" class="form-control" placeholder="Fecha de Recolección">
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Cantidad" />
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Calidad-Semen " />
              </td>
              <td>
                <input type="date" class="form-control" placeholder="Fecha de caducidad">
              </td>
                <td>
                    <input type="date" class="form-control" placeholder="Fecha de salida">
              <td>
                    <input type="text" class="input-no-border" placeholder="Responsable" />
              </td>
              <td>
                    <input type="text" class="input-no-border" placeholder="Solicitante" />
              </td>
              <td>
                <span class="estado-semen">Estado</span> <!-- Cambia el texto según el estado -->
              </td>
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
    // Crear un nuevo documento PDF con orientación horizontal
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape', // Configuración para orientación horizontal
    });
  
    // Obtener las filas de la tabla
    const rows = document.querySelectorAll('#userTable tbody tr');
  
    // Guardar el estado original de los checkboxes antes de modificar
    const originalCheckboxStates = Array.from(rows).map(row => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      return checkbox && checkbox.checked; // Guardamos si estaba marcado o no
    });
  
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
      head: [['Seleccionar',  'Codigo-Verraco', 'Fecha de Recolección', 'Cantidad', 'Calidad-Semen', 'Fecha de caducidad', 'Fecha de salida', 'Responsable', 'Solicitante', 'Estado']], // Encabezados
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
    doc.save('Registro de Enseres.pdf'); // Nombre del archivo
  
    // Restaurar los checkboxes a su estado original después de generar el PDF
    rows.forEach((row, index) => {
      const seleccionarCell = row.children[0];
      seleccionarCell.textContent = ''; // Limpiar el contenido textual de la celda
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input';
      checkbox.checked = originalCheckboxStates[index]; // Restaurar el estado original
  
      seleccionarCell.appendChild(checkbox);
    });
  });
  document.addEventListener('change', function (event) {
    // Verifica si se cambió algo en la tabla (relevante para las fechas)
    if (event.target.classList.contains('fecha-caducidad')) {
      const row = event.target.closest('tr'); // Obtener la fila actual
      const caducidadInput = row.querySelector('.fecha-caducidad'); // Campo de Fecha de Caducidad
      const estadoSpan = row.querySelector('.estado-semen'); // Campo de Estado
  
      const fechaCaducidad = new Date(caducidadInput.value); // Convertir a fecha
      const hoy = new Date(); // Fecha actual
      const diferenciaDias = (fechaCaducidad - hoy) / (1000 * 60 * 60 * 24); // Diferencia en días
  
      // Actualiza el estado según la diferencia de días
      if (diferenciaDias <= 5 && diferenciaDias >= 0) {
        estadoSpan.textContent = 'Por Vencer'; // Si faltan 5 días o menos
        estadoSpan.style.color = 'orange'; // Opcional: color visual
      } else if (diferenciaDias < 0) {
        estadoSpan.textContent = 'Vencido'; // Si la fecha ya pasó
        estadoSpan.style.color = 'red'; // Opcional: color visual
      } else {
        estadoSpan.textContent = 'Disponible'; // Si la fecha está lejos
        estadoSpan.style.color = 'green'; // Opcional: color visual
      }
    }
  });
   //---------------------------------------------------------------------------------------
  // esportar a excel

  document.getElementById('exportExcelButton').addEventListener('click', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  
    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];
  
    // Agregar encabezados al worksheet
    worksheetData.push(['Seleccionar', 'ID-Verraco', 'Fecha de Recolección', 'Cantidad', 'Calidad-Semen','Fecha de caducidad', 'Fecha de Salida', 'Responsable', 'Solicitante']);
  
    // Obtener las filas de la tabla
    const rows = document.querySelectorAll('#userTable tbody tr');
  
    // Recorrer las filas y agregar los datos al worksheet
    rows.forEach(row => {
      const rowData = Array.from(row.cells).map(cell => {
        const input = cell.querySelector('input, select');
  
        if (input) {
          if (input.type === 'checkbox') {
            // Devuelve "on" si está marcado, "off" si no
            return input.checked ? 'oof' : 'on';
          } else if (input.tagName === 'SELECT') {
            // Capturar el texto de la opción seleccionada
            const selectedOption = input.options[input.selectedIndex];
            return selectedOption ? selectedOption.text.trim() : 'Sin Seleccionar';
          } else if (input.type === 'date') {
            // Capturar la fecha directamente
            return input.value;
          } else {
            // Capturar el valor de otros inputs
            return input.value || 'N/A';
          }
        }
  
        // Capturar el texto plano de la celda si no tiene input o select
        return cell.textContent.trim();
      });
  
      // Agregar la fila procesada al worksheet
      worksheetData.push(rowData);
    });
  
    // Crear el worksheet a partir de los datos procesados
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Añadir el worksheet al libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');
  
    // Guardar el archivo Excel
    XLSX.writeFile(workbook, 'Inventario_de_alimentos.xlsx');
  });
  