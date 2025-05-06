document.querySelectorAll('.submenu-hidden, .sub-submenu-hidden').forEach(submenu => {
    submenu.previousElementSibling.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento de enlace
      submenu.classList.toggle('submenu-hidden'); // Alternar visibilidad
      submenu.classList.toggle('show'); // Clase para mostrar el submenú
    });
  });
  