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
       <input type="text" class="input-no-border" placeholder="Nombre" />
     </td>
     <td>
       <input type="text" class="input-no-border" placeholder="Identificación" />
     </td>
     <td>
       <input type="email" class="input-no-border" placeholder="Email" />
     </td>
     <td>
       <input type="tel" class="input-no-border" placeholder="Teléfono" />
     </td>
     <td>
       <select class="form-select input-no-border input-select">
         <option selected disabled>Seleccionar</option>
         <option value="Administrador">Administrador</option>
         <option value="Veterinario">Veterinario</option>
         <option value="Operario">Operario</option>
       </select>
     </td>
     <td>
       <select class="form-select input-no-border">
         <option selected disabled>Seleccionar</option>
         <option value="Leer">Leer</option>
         <option value="Escribir">Escribir</option>
         <option value="Eliminar">Eliminar</option>
       </select>
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
  