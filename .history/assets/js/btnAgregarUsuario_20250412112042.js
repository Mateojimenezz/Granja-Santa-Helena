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
       <select class="form-select input-no-border">
         <option selected disabled>Seleccionar Rol</option>
         <option value="Administrador">Administrador</option>
         <option value="Veterinario">Veterinario</option>
         <option value="Operario">Operario</option>
       </select>
     </td>
     <td>
       <select class="form-select input-no-border">
         <option selected disabled>Asignar Permiso</option>
         <option value="Leer">Leer</option>
         <option value="Escribir">Escribir</option>
         <option value="Eliminar">Eliminar</option>
       </select>
     </td>
   `;

   userTableBody.appendChild(newRow);
 });