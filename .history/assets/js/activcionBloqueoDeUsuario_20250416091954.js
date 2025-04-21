document.addEventListener('click', function (event) {
    const target = event.target;
  
    // Manejar Activar/Bloquear
    if (target.classList.contains('btn-danger') || target.classList.contains('btn-success')) {
      const row = target.closest('tr');
      const estado = row.querySelector('td:nth-child(6) span');
  
      if (target.classList.contains('btn-danger')) {
        estado.textContent = 'Bloqueado';
        estado.className = 'badge bg-danger';
        target.textContent = 'Activar';
        target.className = 'btn btn-success btn-sm';
      } else {
        estado.textContent = 'Activo';
        estado.className = 'badge bg-success';
        target.textContent = 'Bloquear';
        target.className = 'btn btn-danger btn-sm';
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
          <a class="btn-agregar-usuario  ${usuario.estado === 'Activo' ? 'link-rojo' : 'btn-success'} ">${usuario.estado === 'Activo' ? 'Bloquear' : 'Activar'}</a>
          <a class=" btn-agregar-usuario actualizar-usuario">Actualizar</a>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Llama a la función para cargar los usuarios en la tabla
  cargarUsuarios();
  
