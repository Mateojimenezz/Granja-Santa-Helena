document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
    const sidebarMenu = document.getElementById("sidebarMenu"); // Contenedor del menú lateral
  
    function isLargeScreen() {
      return window.innerWidth >= 768; // Define pantallas grandes
    }
  
    function moveSubmenusToSidebar() {
      // Limpia el contenido actual del menú lateral
      sidebarMenu.innerHTML = "";
  
      menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu"); // Submenú debajo del ítem principal
  
        if (submenu) {
          if (isLargeScreen()) {
            // Mover submenú al menú lateral en pantallas grandes
            const clonedItem = item.cloneNode(true); // Clona el ítem del menú superior con su submenú
            clonedItem.querySelector(".submenu").style.display = "block"; // Asegúrate de que el submenú sea visible
            sidebarMenu.appendChild(clonedItem); // Añadir ítem clonado al menú lateral
          } else {
            // Restaurar visibilidad en el menú superior para pantallas pequeñas
            submenu.style.display = "none"; // Ocultar submenú por defecto
            item.addEventListener("click", () => {
              item.classList.toggle("active");
              submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            });
          }
        }
      });
    }
  
    // Ejecutar la lógica inicial
    moveSubmenusToSidebar();
  
    // Ajustar dinámicamente al cambiar el tamaño de la pantalla
    window.addEventListener("resize", moveSubmenusToSidebar);
  });
  
  