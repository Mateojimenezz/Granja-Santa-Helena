document.addEventListener('DOMContentLoaded', function () {
     fetch('http://localhost:3000/api/sesion-actual', {
          method: 'GET',
          credentials: 'include'
     })
          .then(response => {
               if (!response.ok) {
                    throw new Error('No hay sesión activa');
               }
               return response.json();
          })
          .then(data => {
               console.log('Sesión activa:', data.usuario);

               // Si todo está bien, llama cargarUsuarios si existe
               if (typeof cargarUsuarios === 'function') {
                    cargarUsuarios();
               }
          })
          .catch(error => {
               console.warn('Sesión inválida:', error.message);
               const main = document.querySelector('main.container');
               if (main) {
                    main.innerHTML = `
        <div class="alert alert-danger text-center mt-5">
          <h4 class="alert-heading">Sesión no válida</h4>
          <p>Debes iniciar sesión para ver esta sección.</p>
          <a href="/login.html" class="btn btn-success mt-3">Iniciar sesión</a>
        </div>
      `;
               }
          });
});
// Limpia localStorage del navegador por si acaso
localStorage.removeItem("usuarioLogueado");
