// script.js
document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.getElementById("toggleMenu");
    const sidebar = document.getElementById("sidebar");
    const links = document.querySelectorAll('#sidebar .nav-link');
  
    // Mostrar/ocultar el menú
    toggleMenu.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  
    // Hacer clic en un ítem del menú superior
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        alert(`Abriendo menú: ${target}`);
        // Aquí puedes añadir funcionalidad adicional
      });
    });
  });
  