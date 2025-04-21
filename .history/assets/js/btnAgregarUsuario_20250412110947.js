// Función para añadir una nueva fila a la tabla
const addUserButton = document.getElementById('addUserButton');
const userTableBody = document.querySelector('#userTable tbody');

addUserButton.addEventListener('click', function () {
  // Crear una nueva fila
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>
      <input type="checkbox" class="form-check-input" />
    </td>
    <td>
      <input type="text" class="form-control" placeholder="Nombre" />
    </td>
    <td>
      <input type="text" class="form-control" placeholder="Identificación" />
    </td>
    <td>
      <input type="email" class="form-control" placeholder="Email" />
    </td>
    <td>
      <input type="tel" class="form-control" placeholder="Teléfono" />
    </td>
    <td>
      <select class="form-select">
        <option selected disabled>Seleccionar Rol</option>
        <option value="Administrador">Administrador</option>
        <option value="Veterinario">Veterinario</option>
        <option value="Operario">Operario</option>
      </select>
    </td>
    <td>
      <select class="form-select">
        <option selected disabled>Asignar Permiso</option>
        <option value="Leer">Leer</option>
        <option value="Escribir">Escribir</option>
        <option value="Eliminar">Eliminar</option>
      </select>
    </td>
  `;

  // Agregar la nueva fila al cuerpo de la tabla
  userTableBody.appendChild(newRow);
    