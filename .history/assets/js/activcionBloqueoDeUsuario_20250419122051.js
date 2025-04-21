document.addEventListener('click', function (event) {
  const target = event.target;

  // Guardar la posición actual del scroll antes de realizar cambios
  const scrollPosition = window.scrollY;

  // Manejar Activar/Bloquear
  if (target.classList.contains('link-rojo') || target.classList.contains('link-verde')) {
    const row = target.closest('tr');
    const estado = row.querySelector('td:nth-child(6) span');

    if (target.classList.contains('link-rojo')) {
      if (confirm('¿Estás seguro de bloquear a este usuario?')) {
        estado.textContent = 'Bloqueado';
        estado.className = 'badge bg-danger';
        target.textContent = 'Activar';
        target.classList.remove('link-rojo');
        target.classList.add('link-verde');
        target.style.color = 'green'; // Cambia el color al activar
        alert('El usuario ha sido bloqueado exitosamente.');
      }
    } else if (target.classList.contains('link-verde')) {
      if (confirm('¿Estás seguro de activar a este usuario?')) {
        estado.textContent = 'Activo';
        estado.className = 'badge bg-success';
        target.textContent = 'Bloquear';
        target.classList.remove('link-verde');
        target.classList.add('link-rojo');
        target.style.color = 'red'; // Cambia el color al bloquear
        alert('El usuario ha sido activado exitosamente.');
      }
    }
  }

  // Manejar Actualizar
  else if (target.classList.contains('actualizar-usuario')) {
    const row = target.closest('tr');
    const nombre = row.children[0].textContent;
    const identificacion = row.children[1].textContent;
    const email = row.children[2].textContent;
    const telefono = row.children[3].textContent;
    const rol = row.children[4].textContent;
    const estado = row.children[5].querySelector('span').textContent;

    console.log({
      nombre: nombre.trim(),
      identificacion: identificacion.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      rol: rol.trim(),
      estado: estado.trim(),
    });

    alert(`Usuario actualizado:\nNombre: ${nombre}\nEstado: ${estado}`);
  }

  // Restaurar la posición del scroll después de la acción
  window.scrollTo(0, scrollPosition);
});

// Ejemplo de usuarios registrados
const usuarios = [
  { nombre: 'Juan Pérez', id: '123456789', email: 'juan.perez@example.com', telefono: '+57 3001234567', rol: 'Operario', estado: 'Activo' },
  { nombre: 'María Gómez', id: '987654321', email: 'maria.gomez@example.com', telefono: '+57 3011234567', rol: 'Supervisor', estado: 'Bloqueado' }
];

// Referencia al cuerpo de la tabla
const tbody = document.getElementById('userTableBody');

// Función para generar filas dinámicamente
function cargarUsuarios() {
  usuarios.forEach(usuario => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.id}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.rol}</td>
      <td><span class="badge ${usuario.estado === 'Activo' ? 'bg-success' : 'bg-danger'}">${usuario.estado}</span></td>
      <td>
        <a href="#" class="link-accion ${usuario.estado === 'Activo' ? 'link-rojo' : 'link-verde'}">${usuario.estado === 'Activo' ? 'Bloquear' : 'Activar'}</a>
        <a href="#" class="link-accion actualizar-usuario">Actualizar</a>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Llama a la función para cargar los usuarios en la tabla
cargarUsuarios();

