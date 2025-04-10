document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // Verifica si la pantalla es grande antes de ejecutar lógica
  function isLargeScreen() {
    return window.innerWidth >= 768; // Pantallas md o más grandes
  }

  if (isLargeScreen()) {
    // Mostrar/ocultar el menú al hacer clic en el botón externo
    toggleMenu.addEventListener("click", function () {
      if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block";
        mainContent.style.marginLeft = "270px";
      } else {
        sidebar.style.display = "none";
        mainContent.style.marginLeft = "0";
      }
    });

    // Ocultar el menú al hacer clic en el botón "Cerrar"
    closeMenu.addEventListener("click", function () {
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "0";
    });

    // Funcionalidad para los ítems del menú superior
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (sidebar.style.display === "block") {
          sidebar.style.display = "none";
          mainContent.style.marginLeft = "0";
        } else {
          sidebar.style.display = "block";
          mainContent.style.marginLeft = "270px";
        }
      });
    });
  }
});






  