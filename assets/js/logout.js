document.querySelectorAll('.cerrar-sesion').forEach(boton => {
  boton.addEventListener('click', () => {
    // Limpia almacenamiento local y de sesión
    localStorage.clear();
    sessionStorage.clear();

    // Intenta hacer logout en backend (opcional)
    fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      // Si el backend respondió bien, o aunque falle, igual redirige
      window.location.href = '/login.html';
    })
    .catch(error => {
      console.error('Error al cerrar sesión en el backend:', error);
      // Igual redirige aunque haya error en el backend
      window.location.href = '/login.html';
    });
  });
});
