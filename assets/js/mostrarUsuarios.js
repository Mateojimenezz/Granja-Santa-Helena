document.addEventListener('DOMContentLoaded', function () {
  cargarUsuarios(); // Llamar la función al cargar la página
});

function cargarUsuarios() {
  fetch('http://localhost:3000/api/usuarios', {
    method: 'GET',
    credentials: 'include' // Importante para que mande cookies de sesión
  })
    .then(response => {
      if (response.status === 403) {
        throw new Error('403');
      } else if (!response.ok) {
        throw new Error('Error al obtener usuarios.');
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.getElementById('userTableBody');
      if (!tbody) {
        console.warn("No se encontró la tabla con id 'userTableBody'");
        return;
      }

      tbody.innerHTML = ''; // Limpiar tabla antes de mostrar

      data.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.identificacion}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefono}</td>
          <td>${usuario.cargo}</td>
          <td>${usuario.permiso}</td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      const main = document.querySelector('main.container');
      if (!main) return;

      if (error.message === '403') {
        main.innerHTML = `
          <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Acceso denegado</h4>
            <p>No tienes permisos para ver esta sección.</p>
          </div>
        `;
      } else {
        main.innerHTML = `
          <div class="alert alert-warning text-center" role="alert">
            <h4 class="alert-heading">Error inesperado</h4>
            <p>No se pudieron cargar los usuarios. Intenta nuevamente más tarde.</p>
          </div>
        `;
        console.error('Error inesperado:', error);
      }
    });
}
