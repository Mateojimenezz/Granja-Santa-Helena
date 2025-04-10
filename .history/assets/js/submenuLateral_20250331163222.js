document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
    const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral
  
    function isLargeScreen() {
      return window.innerWidth >= 768; // Define pantallas grandes
    }
  
    // Función para mover submenús al menú lateral
    function moveSubmenusToSidebar() {
      sidebarMenu.innerHTML = ""; // Limpia el contenido actual del menú lateral
  
      menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        const link = item.querySelector(".nav-link");
  
        if (submenu) {
          if (isLargeScreen()) {
            // Crear un ítem nuevo para el menú lateral con el submenú
            const sidebarItem = document.createElement("li");
            sidebarItem.classList.add("nav-item");
  
            // Clonar el enlace principal
            const clonedLink = link.cloneNode(true);
            sidebarItem.appendChild(clonedLink);
  
            // Clonar el submenú y añadirlo al ítem del menú lateral
            const clonedSubmenu = submenu.cloneNode(true);
            sidebarItem.appendChild(clonedSubmenu);
  
            // Añadir el ítem con el submenú al menú lateral
            sidebarMenu.appendChild(sidebarItem);
  
            // Ocultar el submenú en el menú superior
            submenu.style.display = "none";
          } else {
            // Restaurar el submenú al menú superior para pantallas pequeñas
            submenu.style.display = "none"; // Ocultar inicialmente
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
  