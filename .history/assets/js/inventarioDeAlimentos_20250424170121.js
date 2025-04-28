 // Objeto con las categorías y sus tipos relacionados
const categoriasYTipos = {
  Energeticos: [
    "Granos y Cereales",
    "Subproductos Agrícolas"
  ],
  Proteicos: [
    "Harinas de Origen Animal",
    "Harinas de Origen Vegetal"
  ],
  Fibrosos: [
    "Forrajes y Pastos",
    "Subproductos Industriales"
  ],
  Minerales: [
    "Suplementos Minerales",
    "Lote Especial de Minerales"
  ],
  Vitaminas: [
    "Premezclas Vitamínicas",
    "Vitaminas en Polvo"
  ]
};
function filtrarTabla() {
  const filtro = document.getElementById('busqueda').value.toLowerCase().trim(); // Texto ingresado
  const filas = document.querySelectorAll('#userTable  tr'); // Todas las filas de la tabla
  
  let hayResultados = false; // Variable para verificar si hay coincidencias
thead
  filas.forEach(fila => {
    const textoFila = fila.innerText.toLowerCase().trim(); // Texto visible de la fila
    if (textoFila.includes(filtro)) {
      fila.style.display = ''; // Mostrar fila si coincide
      hayResultados = true; // Marca que hay coincidencias
    } else {
      fila.style.display = 'none'; // Ocultar fila si no coincide
    }
  });

  // Si no hay resultados, mostrar un mensaje de consola para depuración
  if (!hayResultados) {
    console.log(`No se encontraron resultados para "${filtro}"`);
  }
}

// Escucha los eventos de la barra y el botón
document.getElementById('busqueda').addEventListener('input', filtrarTabla);
document.getElementById('boton-buscar').addEventListener('click', filtrarTabla);








// Evento para actualizar los tipos según la categoría seleccionada
document.addEventListener('change', function (event) {
  // Verificar si el cambio ocurrió en el selector de categoría
  if (event.target.classList.contains('form-select-categoria')) {
    const categoriaSeleccionada = event.target.value; // Categoría seleccionada
    const fila = event.target.closest('tr'); // Obtener la fila actual
    const tipoSelect = fila.querySelector('.form-select-tipo'); // Campo de Tipos

    // Limpiar las opciones del campo de Tipos
    tipoSelect.innerHTML = '<option selected disabled>Seleccionar Tipo</option>';

    // Añadir las opciones relacionadas según la categoría seleccionada
    if (categoriasYTipos[categoriaSeleccionada]) {
      categoriasYTipos[categoriaSeleccionada].forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.toLowerCase();
        option.textContent = tipo;
        tipoSelect.appendChild(option);
      });
    }
  }
});
// Evento para actualizar el estado del alimento según la fecha de caducidad
document.addEventListener('change', function (event) {
  if (event.target.classList.contains('form-control-fecha')) {
    const row = event.target.closest('tr');
    const fechaCaducidad = new Date(row.querySelector('.fecha-caducidad').value);
    const hoy = new Date();
    const diferenciaDias = (fechaCaducidad - hoy) / (1000 * 60 * 60 * 24);
    const estadoSpan = row.querySelector('.estado-alimento');

    if (diferenciaDias <= 5 && diferenciaDias >= 0) {
      estadoSpan.textContent = 'Por Vencer';
      estadoSpan.style.color = 'orange';
    } else if (diferenciaDias < 0) {
      estadoSpan.textContent = 'Vencido';
      estadoSpan.style.color = 'red';
    } else {
      estadoSpan.textContent = 'Disponible';
      estadoSpan.style.color = 'green';
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
        <select class="form-select">
            <option selected disabled>Seleccionar</option> <!-- Opción predeterminada -->
            <option value="Energeticos">Alimentos Energéticos</option>
            <option value="Proteicos">Alimentos Proteicos</option>
            <option value="Fibrosos">Alimentos Fibrosos</option>
            <option value="Minerales">Alimentos Minerales</option>
            <option value="Vitaminas">Vitaminas</option>
        </select>
     </td>
     <td>
       <select class="form-select">
            <option selected disabled>Seleccionar</option> <!-- Opción predeterminada -->
            <option value="Granos y Cereales">Granos y Cereales</option>
            <option value="Subproductos Industriales">Subproductos Industriales</option>
            <option value="Harinas de Origen Animal">Harinas de Origen Animal</option>
            <option value="Harinas de Origen Vegetal">Harinas de Origen Vegetal</option>
            <option value="Forrajes y Pastos">Forrajes y Pastos</option>
            <option value="Subproductos Agrícolas">Subproductos Agrícolas</option>
            <option value="Suplementos Minerales">Suplementos Minerales</option>
            <option value="Premezclas Vitamínicas">Premezclas Vitamínicas</option>
        </select>
     </td>
     <td>
       <input type="text" class="form-control" placeholder="Cantidad (kg)">
     </td>
     <td>
        <input type="date" class="input-no-border" placeholder="555-1234" />
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
      <td>
        <input type="text" class="input-no-border" placeholder="Nombres" />
      </td>
      <td>
        <span class="estado-alimento">Estado</span>
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
  
    // Obtener los datos de la tabla para el PDF
    const table = document.getElementById('userTable');
    doc.autoTable({
      head: [['Seleccionar', 'Categoría', 'Tipo de Alimentos', 'Cantidad', 'Fecha de Entrega', 'Proveedor', 'Lote', 'Fecha de Vencimiento']], // Encabezados
      body: Array.from(table.querySelectorAll('tbody tr')).map(row => {
        return Array.from(row.cells).map(cell => {
          const input = cell.querySelector('input, select');
          return input ? input.value || input.options[input.selectedIndex]?.text : cell.textContent.trim();
        });
      }),
    });
  
    // Guardar como archivo PDF
    doc.save('Inventario_de_alimentos.pdf'); // Nombre del archivo
  
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
  