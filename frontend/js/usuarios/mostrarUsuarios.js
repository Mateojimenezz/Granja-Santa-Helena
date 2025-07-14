document.addEventListener('DOMContentLoaded', function () {
  cargarUsuarios();
});

let cambiosPendientes = new Map();

function cargarUsuarios() {
  fetch('http://localhost:3000/api/usuarios', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      if (response.status === 403) throw new Error('403');
      if (!response.ok) throw new Error('Error al obtener usuarios.');
      return response.json();
    })
    .then(usuarios => {
      const tbody = document.getElementById('userTableBody');
      tbody.innerHTML = '';

      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.setAttribute('data-id', usuario.id);

        fila.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.identificacion}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefono}</td>
          <td>
            <select class="form-select form-select-sm cargo-select" data-id="${usuario.id}">
              <option ${usuario.cargo === 'Administrador' ? 'selected' : ''}>Administrador</option>
              <option ${usuario.cargo === 'Veterinario' ? 'selected' : ''}>Veterinario</option>
              <option ${usuario.cargo === 'Operador' ? 'selected' : ''}>Operador</option>
              </select>
          </td>
          <td>
            <select class="form-select form-select-sm permiso-select" data-id="${usuario.id}">
              <option ${usuario.permiso === 'Permitido' ? 'selected' : ''}>Permitido</option>
              <option ${usuario.permiso === 'Denegado' ? 'selected' : ''}>Denegado</option>
            </select>
          </td>
        `;
        tbody.appendChild(fila);
      });

      agregarEventosCambio();
      agregarBotonGuardar();
    })
    .catch(error => {
      const main = document.querySelector('main.container');
      if (!main) return;
      if (error.message === '403') {
        main.innerHTML = `<div class="alert alert-danger text-center"><h4 class="alert-heading">Acceso denegado</h4><p>No tienes permisos para ver esta sección.</p></div>`;
      } else {
        main.innerHTML = `<div class="alert alert-warning text-center"><h4 class="alert-heading">Error inesperado</h4><p>No se pudieron cargar los usuarios.</p></div>`;
        console.error('Error inesperado:', error);
      }
    });
}

function agregarEventosCambio() {
  document.querySelectorAll('.cargo-select, .permiso-select').forEach(select => {
    select.addEventListener('change', () => {
      const id = select.getAttribute('data-id');
      const fila = document.querySelector(`tr[data-id="${id}"]`);
      const cargo = fila.querySelector('.cargo-select').value;
      const permiso = fila.querySelector('.permiso-select').value;

      cambiosPendientes.set(id, { cargo, permiso });
      document.getElementById('guardarCambiosBtn').style.display = 'block';
    });
  });
}

function agregarBotonGuardar() {
  let boton = document.getElementById('guardarCambiosBtn');
  if (!boton) {
    boton = document.createElement('button');
    boton.id = 'guardarCambiosBtn';
    boton.className = 'btn btn-success mt-3';
    boton.textContent = 'Guardar cambios';
    boton.style.display = 'none';

    boton.addEventListener('click', guardarCambiosUsuarios);

    document.querySelector('main.container').appendChild(boton);
  }
}

function guardarCambiosUsuarios() {
  const peticiones = [];

  cambiosPendientes.forEach((data, id) => {
    const peticion = fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (!res.ok) throw new Error(`Error actualizando usuario ID ${id}`);
      return res.json();
    });

    peticiones.push(peticion);
  });

  Promise.all(peticiones)
    .then(() => {
      alert('Cambios guardados correctamente.');
      cambiosPendientes.clear();
      document.getElementById('guardarCambiosBtn').style.display = 'none';
      cargarUsuarios(); // Recargar tabla actualizada
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Hubo un error al guardar los cambios.');
    });
}
