// Este script se encarga de manejar la activación y bloqueo de usuarios en la tabla de administración de usuarios
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-danger')) {
      const row = event.target.closest('tr');
      const estado = row.querySelector('td:nth-child(6) span');
      estado.textContent = 'Bloqueado';
      estado.className = 'badge bg-danger'; // Cambia el estilo del estado
      event.target.textContent = 'Activar'; // Cambia el botón a "Activar"
      event.target.className = 'btn btn-success btn-sm'; // Cambia el botón a verde
    } else if (event.target.classList.contains('btn-success')) {
      const row = event.target.closest('tr');
      const estado = row.querySelector('td:nth-child(6) span');
      estado.textContent = 'Activo';
      estado.className = 'badge bg-success'; // Cambia el estilo del estado
      event.target.textContent = 'Bloquear'; // Cambia el botón a "Bloquear"
      event.target.className = 'btn btn-danger btn-sm'; // Cambia el botón a rojo
    }
  });
  document.addEventListener('click', function (event) {
    // Verifica si se hizo clic en un botón "Actualizar"
    if (event.target.classList.contains('actualizar-usuario')) {
      const row = event.target.closest('tr'); // Selecciona la fila correspondiente
      const nombre = row.children[0].textContent; // Nombre del usuario
      const identificacion = row.children[1].textContent; // Identificación
      const email = row.children[2].textContent; // Email
      const telefono = row.children[3].textContent; // Teléfono
      const rol = row.children[4].textContent; // Rol
      const estado = row.children[5].querySelector('span').textContent; // Estado

      // Simular el envío de datos
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
