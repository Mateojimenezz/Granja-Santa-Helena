document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
    const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral
    const toggleMenu = document.getElementById("toggleMenu"); // Botón para abrir el menú lateral
    const sidebar = document.getElementById("sidebar"); // Menú lateral completo
    const closeMenu = document.getElementById("closeMenu"); // Botón para cerrar el menú lateral
  
    function isLargeScreen() {
      return window.innerWidth >= 768; // Define pantallas grandes
    }
  
    // Función para ocultar todos los submenús en el header
    function hideAllHeaderSubmenus() {
      menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
          submenu.style.display = "none"; // Oculta el submenú
          item.classList.remove("active"); // Elimina la clase activa si existe
        }
      });
    }
  
    // Función para mostrar solo un submenú en el menú lateral
    function showSingleSubmenu(item) {
      clearSidebarMenu();
  
      const link = item.querySelector(".nav-link");
      const submenu = item.querySelector(".submenu");
  
      if (submenu) {
        const sidebarItem = document.createElement("li");
        sidebarItem.classList.add("nav-item");
  
        // Clonar el enlace principal
        const clonedLink = link.cloneNode(true);
        sidebarItem.appendChild(clonedLink);
  
        // Clonar el submenú y añadirlo al ítem
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "block"; // Mostrar el submenú específico
        sidebarItem.appendChild(clonedSubmenu);
  
        sidebarMenu.appendChild(sidebarItem); // Añadir el ítem específico al menú lateral
      }
    }
  
    // Manejar clics en los ítems del header
    menuItems.forEach(item => {
      const link = item.querySelector(".nav-link");
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Evitar comportamiento predeterminado
  
        if (isLargeScreen()) {
          hideAllHeaderSubmenus(); // Ocultar todos los submenús en el header
          showSingleSubmenu(item); // Mostrar solo el submenú correspondiente en el menú lateral
        }
      });
    });
  
    // Función para manejar el botón de abrir el menú lateral
    toggleMenu.addEventListener("click", function () {
      sidebar.style.display = "block";
      showAllMenuItems(); // Mostrar todos los ítems y submenús completos
      hideAllHeaderSubmenus(); // Asegurarse de que los submenús del header estén ocultos
    });
  
    // Función para manejar el botón de cerrar el menú lateral
    closeMenu.addEventListener("click", function () {
      sidebar.style.display = "none"; // Ocultar el menú lateral
    });
  
    // Ajustar dinámicamente al redimensionar la pantalla
    window.addEventListener("resize", function () {
      if (isLargeScreen()) {
        showAllMenuItems(); // Mostrar todos los ítems completos en pantallas grandes
      } else {
        clearSidebarMenu(); // Limpiar el menú lateral en pantallas pequeñas
        hideAllHeaderSubmenus(); // Ocultar submenús del header
      }
    });
  });
  