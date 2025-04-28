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
        <select class="form-select">
            <option selected disabled>Seleccionar</option> <!-- Opción predeterminada -->
            <option value="Proveedor 1">Proveedor 1</option>
            <option value="Proveedor 2">Proveedor 2</option>
            <option value="Proveedor 3">Proveedor 3</option>
        </select>
    </td>
    <td>
         <select class="form-select">
            <option selected disabled>Seleccionar</option> <!-- Opción predeterminada -->
            <option value="Lote 1">lote 1</option>
            <option value="Lote 2">Lote 2</option>
            <option value="Lote 3">Lote 3</option>
        </select>
    </td>
     <td>
        <input type="date" class="input-no-border" placeholder="555-1234" />
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

    // Obtener los datos de la tabla
    const table = document.getElementById('userTable');
    doc.autoTable({
      head: [[ 'Categoria', '', 'Email', 'Teléfono', 'Rol', 'Asignar Permisos']], // Encabezados
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