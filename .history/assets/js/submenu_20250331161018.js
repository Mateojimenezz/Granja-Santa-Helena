d       }
        }
      });ocument.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú
  
    function isLargeScreen() {
      return window.innerWidth >= 768; // Pantallas grandes
    }
  
    // Funcionalidad para mostrar los submenús según la pantalla
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
  
      if (submenu) {
        if (isLargeScreen()) {
          // Mostrar automáticamente los submenús en pantallas grandes
          submenu.style.display = "block"; // Submenús visibles en el lateral
        } else {
          // Pantallas pequeñas: Mostrar submenús al hacer clic
          item.addEventListener("click", () => {
            item.classList.toggle("active"); // Alternar clase activa
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
          });
        }
      }
    });
  
    // Redimensionar: Ajustar los estilos al cambiar el tamaño de la ventana
    window.addEventListener("resize", function () {
      menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
          if (isLargeScreen()) {
            submenu.style.display = "block"; // Pantalla grande: Siempre visible
          } else {
            submenu.style.display = "none"; // Pantalla pequeña: Ocultar por defecto
   
    });
  });
  