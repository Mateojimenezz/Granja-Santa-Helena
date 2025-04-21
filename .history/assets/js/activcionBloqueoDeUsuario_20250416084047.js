<script>
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
