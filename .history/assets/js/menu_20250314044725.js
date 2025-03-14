document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".navbar-toggler");
    const logo = document.querySelector(".logo");
    const menu = document.getElementById("menu");
  
    menuToggle.addEventListener("click", function () {
      if (menu.classList.contains("show")) {
        // Si el menú ya está abierto, mostramos el logo nuevamente
        logo.style.display = "flex";
      } else {
        // Si el menú no está abierto, ocultamos el logo
        logo.style.display = "none";
      }
    });
  });
  
  
  