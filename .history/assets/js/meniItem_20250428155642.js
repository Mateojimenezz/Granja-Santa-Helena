document.querySelectorAll('.nav-item > .submenu').forEach(submenu => {
    submenu.parentElement.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado
      submenu.classList.toggle('submenu-hidden'); // Mostrar u ocultar el menú
      submenu.classList.toggle('show'); // Clase para mostrar el menú
    });
  });
  
  document.querySelectorAll('.submenu > .sub-submenu').forEach(subsubmenu => {
    subsubmenu.parentElement.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado
      subsubmenu.classList.toggle('sub-submenu-hidden'); // Mostrar u ocultar el submenú
      subsubmenu.classList.toggle('show'); // Clase para mostrar el submenú
    });
  });