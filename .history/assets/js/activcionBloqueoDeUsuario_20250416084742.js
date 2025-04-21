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
  
