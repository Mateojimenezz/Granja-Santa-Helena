

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".navbar-toggler");
    const logo = document.querySelector(".logo");
    const menu = document.getElementById("menu");
  
    menuToggle.addEventListener("click", function () {
      const isMenuOpen = menu.classList.contains("show");
  
      if (isMenuOpen) {
        // Cuando el menú está abierto, restauramos el logo
        logo.style.display = "flex";
      } else {
        // Cuando el menú está cerrado, ocultamos el logo
        logo.style.display = "none";
      }
    });
  
    // Detectar cuando el usuario cierra el menú automáticamente
    menu.addEventListener("hidden.bs.collapse", function () {
      logo.style.display = "flex";
    });
  });
  
  
  
  
  