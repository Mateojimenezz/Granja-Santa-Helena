// inventarioDeAlimentos.js

const categoriasYTipos = {
  Energeticos: ["Granos y Cereales", "Subproductos Agrícolas"],
  Proteicos: ["Harinas de Origen Animal", "Harinas de Origen Vegetal"],
  Fibrosos: ["Forrajes y Pastos", "Subproductos Industriales"],
  Minerales: ["Suplementos Minerales", "Lote Especial de Minerales"],
  Vitaminas: ["Premezclas Vitamínicas", "Vitaminas en Polvo"]
};

// Función para validar y guardar los datos seleccionados
document.getElementById("saveButton").addEventListener("click", () => {
  const filas = document.querySelectorAll("#userTable tbody tr");
  const datos = [];

  filas.forEach((fila, index) => {
    const checkbox = fila.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      const categoria = fila.querySelector(".form-select-categoria")?.value || fila.children[1]?.innerText.trim();
      const tipo = fila.querySelector(".form-select-tipo")?.value || fila.children[2]?.innerText.trim();
      const cantidadStr = fila.querySelector("input[placeholder='Cantidad (kg)']")?.value || fila.children[3]?.innerText.trim();
      const cantidad = parseFloat(cantidadStr);
      const fecha_entrada = fila.querySelector("input[type='date']")?.value || fila.children[4]?.innerText.trim();
      const proveedor = fila.querySelector(".form-select-proveedor")?.value || fila.children[5]?.innerText.trim();
      const lote = fila.querySelector(".form-select-lote")?.value || fila.children[6]?.innerText.trim();
      const fecha_vencimiento = fila.querySelector(".fecha-caducidad")?.value || fila.children[7]?.innerText.trim();
      const responsable = fila.querySelector(".input-responsable")?.value || fila.children[8]?.innerText.trim();
      const estado = fila.querySelector(".estado-alimento")?.innerText.trim() || fila.children[9]?.innerText.trim();

      // Validación de campos obligatorios
      if (!categoria || !tipo || isNaN(cantidad) || cantidad <= 0 || !fecha_entrada || !proveedor || !lote || !fecha_vencimiento || !responsable) {
        alert(`Por favor, complete todos los campos correctamente en la fila ${index + 1}.`);
        throw new Error("Campos incompletos o inválidos en fila para guardar");
      }

      datos.push({ categoria, tipo, cantidad, fecha_entrada, proveedor, lote, fecha_vencimiento, responsable, estado });
    }
  });

  if (datos.length === 0) {
    alert("Por favor, selecciona al menos una fila para guardar.");
    return;
  }

  // Envío de datos al backend
  fetch("http://localhost:3000/api/inventario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })
  .then(response => {
    if (response.ok) {
      alert("Registros guardados correctamente");
    } else {
      response.text().then(text => {
        alert(`Error al guardar: ${text}`);
        console.error("Error response text:", text);
      });
    }
  })
  .catch(error => {
    console.error("Error en la solicitud:", error);
    alert("Error en la conexión con el servidor.");
  });
});

// Actualiza el select de tipo según la categoría seleccionada
document.addEventListener('change', function (event) {
  if (event.target.classList.contains('form-select-categoria')) {
    const categoriaSeleccionada = event.target.value;
    const fila = event.target.closest('tr');
    const tipoSelect = fila.querySelector('.form-select-tipo');

    tipoSelect.innerHTML = '<option selected disabled>Seleccionar Tipo</option>';

    if (categoriasYTipos[categoriaSeleccionada]) {
      categoriasYTipos[categoriaSeleccionada].forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        tipoSelect.appendChild(option);
      });
    }
  }
});

// Cambia el estado visual del alimento según fecha de vencimiento
document.addEventListener('change', function (event) {
  if (event.target.classList.contains('fecha-caducidad')) {
    const row = event.target.closest('tr');
    const fechaCaducidad = new Date(event.target.value);
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

// Añadir nueva fila a la tabla
const addUserButton = document.getElementById('addUserButton');
const userTableBody = document.querySelector('#userTable tbody');

addUserButton.addEventListener('click', function () {
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td><input type="checkbox" class="form-check-input" /></td>
    <td>
      <select class="form-select form-select-categoria input-control" title="Seleccione una categoría">
        <option selected disabled>Seleccionar</option>
        <option value="Energeticos">Alimentos Energéticos</option>
        <option value="Proteicos">Alimentos Proteicos</option>
        <option value="Fibrosos">Alimentos Fibrosos</option>
        <option value="Minerales">Alimentos Minerales</option>
        <option value="Vitaminas">Vitaminas</option>
      </select>
    </td>
    <td>
      <select class="form-select form-select-tipo input-control" title="Seleccione un tipo de alimento">
        <option selected disabled>Seleccionar Tipo</option>
      </select>
    </td>
    <td><input type="text" class="input-no-border" placeholder="Cantidad (kg)"></td>
    <td><input type="date" class="input-no-border"></td>
    <td>
      <select class="form-select form-select-proveedor input-control">
        <option selected disabled>Seleccionar</option>
        <option value="Proveedor 1">Proveedor 1</option>
        <option value="Proveedor 2">Proveedor 2</option>
        <option value="Proveedor 3">Proveedor 3</option>
      </select>
    </td>
    <td>
      <select class="form-select form-select-lote input-control">
        <option selected disabled>Seleccionar</option>
        <option value="Lote 1">Lote 1</option>
        <option value="Lote 2">Lote 2</option>
        <option value="Lote 3">Lote 3</option>
      </select>
    </td>
    <td><input type="date" class="input-no-border fecha-caducidad"></td>
    <td><input type="text" class="input-no-border input-responsable" placeholder="Nombres"></td>
    <td><span class="estado-alimento"></span></td>
  `;

  userTableBody.appendChild(newRow);
});

// Eliminar filas seleccionadas o la última fila si no hay selección
const deleteUserButton = document.getElementById('deleteUserButton');
deleteUserButton.addEventListener('click', function () {
  const selectedRows = Array.from(document.querySelectorAll('#userTable tbody tr')).filter(row => {
    const checkbox = row.querySelector('.form-check-input');
    return checkbox && checkbox.checked;
  });

  if (selectedRows.length > 0) {
    selectedRows.forEach(row => row.remove());
  } else {
    const rows = document.querySelectorAll('#userTable tbody tr');
    if (rows.length > 0) {
      rows[rows.length - 1].remove();
    }
  }
});

// Exportar tabla a PDF usando jsPDF y autoTable
const printButton = document.getElementById('printButton');
printButton.addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const table = document.getElementById('userTable');
  doc.autoTable({
    head: [['Seleccionar', 'Categoría', 'Tipo de Alimentos', 'Cantidad', 'Fecha de Entrada', 'Proveedor', 'Lote', 'Fecha de Vencimiento', 'Responsable', 'Estado']],
    body: Array.from(table.querySelectorAll('tbody tr')).map(row => {
      return Array.from(row.cells).map(cell => {
        const input = cell.querySelector('input, select');
        return input ? (input.value || input.options[input.selectedIndex]?.text) : cell.textContent.trim();
      });
    }),
  });

  doc.save('Inventario_de_alimentos.pdf');
});

// Función para filtrar la tabla según el texto de búsqueda
function filtrarTabla() {
  const filtro = document.getElementById('busqueda').value.toLowerCase().trim();
  const filas = document.querySelectorAll('#userTable tbody tr');

  let hayResultados = false;

  filas.forEach(fila => {
    let textoFila = '';

    fila.querySelectorAll('td').forEach(celda => {
      const elemento = celda.querySelector('input, select, span');
      if (elemento) {
        if (elemento.tagName === 'INPUT') {
          textoFila += elemento.value.toLowerCase() + ' ';
        } else if (elemento.tagName === 'SELECT') {
          textoFila += (elemento.options[elemento.selectedIndex]?.text.toLowerCase() || '') + ' ';
        } else if (elemento.tagName === 'SPAN') {
          textoFila += elemento.textContent.toLowerCase() + ' ';
        }
      } else {
        textoFila += celda.textContent.toLowerCase() + ' ';
      }
    });

    if (textoFila.includes(filtro)) {
      fila.style.display = '';
      hayResultados = true;
    } else {
      fila.style.display = 'none';
    }
  });

  const tabla = document.getElementById('userTable');
  tabla.style.display = hayResultados ? '' : 'none';

  const sinResultados = document.getElementById('sinResultados');
  if (sinResultados) {
    sinResultados.style.display = hayResultados ? 'none' : '';
  }
}

document.getElementById('busqueda').addEventListener('keyup', filtrarTabla);
// esportar a excel

  document.getElementById('exportExcelButton').addEventListener('click', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  
    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];
  
    // Agregar encabezados al worksheet
    worksheetData.push(['Seleccionar', 'Fecha', 'Lote', 'Categoría', 'Tipo de Alimentos', 'Cantidad de Salida', 'Destino', 'Responsable']);
  
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
