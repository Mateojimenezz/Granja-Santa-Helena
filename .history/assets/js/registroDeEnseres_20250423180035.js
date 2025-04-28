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
         <td>
                <input type="checkbox" class="form-check-input" />
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Nombres" />
                
              </td>
              <td>
                <select class="form-select categoria-select">
                  <option selected disabled>Seleccionar Categoría</option>
                  <option value="alimentacion">Equipos de Alimentación</option>
                  <option value="limpieza">Equipos de Limpieza</option>
                  <option value="cuidado">Material de Cuidado Animal</option>
                  <option value="mantenimiento">Materiales de Mantenimiento</option>
                </select>
              </td>
              <td>
                <select class="form-select tipo-select">
                  <option selected disabled>Seleccionar Tipo</option>
                  <!-- Este campo se actualizará dinámicamente -->
                </select>
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Cantidad" />
              <td>
                <input type="date" class="form-control" placeholder="Fecha de entrada">
              </td>
              <td>
                <input type="date" class="form-control" placeholder="Fecha de salida">
              </td>
              <td>
                <input type="text" class="input-no-border" placeholder="Proveedor" />
              </td>
              <td>
                <!-- Selector de Lote -->
                <select class="form-select">
                    <option selected disabled>Seleccionar</option> <!-- Opción predeterminada -->
                    <option value="Lote 1">lote 1</option>
                    <option value="Lote 2">Lote 2</option>
                    <option value="Lote 3">Lote 3</option>
                  </select>
              </td>
              <td>
                <select class="form-select">
                    <option selected disabled>Seleccionar Estado</option> <!-- Opción predeterminada -->
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="en_reparacion">En Reparación</option>
                    <option value="por_reemplazar">Por Reemplazar</option>
                  </select>                  
              </td>
              <td>
                    <input type="text" class="input-no-border" placeholder="Responsable" />
              </td>
              <td>
                    <input type="text" class="input-no-border" placeholder="Solicitante" />
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
 
  