document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".navbar-toggler");
    const logo = document.querySelector(".logo");
    const menu = document.getElementById("menu");
  
    menuToggle.addEventListener("click", function () {
      if (menu.classList.contains("show")) {
        // Si el menú ya está visible, cerramos y restauramos el logo
        menu.classList.remove("show");
        logo.style.display = "flex";
      } else {
        // Si el menú no está visible, abrimos y ocultamos el logo
        menu.classList.add("show");
        logo.style.display = "none";
      }
    });
  
    // Detectar cuando el usuario cierra el menú manualmente
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove("show"); // Cierra el menú
        logo.style.display = "flex"; // Restaura el logo
      }
    });
  });
  
  
  
  