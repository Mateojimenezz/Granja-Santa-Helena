/*  */
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
    const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral
    const toggleMenu = document.getElementById("toggleMenu"); // Botón para abrir el menú lateral
    const sidebar = document.getElementById("sidebar"); // Menú lateral completo
    const closeMenu = document.getElementById("closeMenu"); // Botón para cerrar el menú lateral
  
    function isLargeScreen() {
      return window.innerWidth >= 768; // Define pantallas grandes
    }
  
    // Función para ocultar todos los submenús del menú lateral
    function clearSidebarMenu() {
      sidebarMenu.innerHTML = ""; // Vacía el contenido del menú lateral
    }
  
    // Función para mostrar todos los ítems y submenús completos en el menú lateral
    function showAllMenuItems() {
      clearSidebarMenu();
  
      menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        const link = item.querySelector(".nav-link");
  
        const sidebarItem = document.createElement("li");
        sidebarItem.classList.add("nav-item");
  
        // Clonar el enlace principal
        const clonedLink = link.cloneNode(true);
        sidebarItem.appendChild(clonedLink);
  
        // Clonar el submenú y añadirlo al ítem
        if (submenu) {
          const clonedSubmenu = submenu.cloneNode(true);
          clonedSubmenu.style.display = "block"; // Mostrar submenús completos
          sidebarItem.appendChild(clonedSubmenu);
        }
  
        sidebarMenu.appendChild(sidebarItem); // Añadir ítem completo al menú lateral
      });
    }
  
    // Función para mostrar solo el submenú seleccionado
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
  
    // Configuración inicial: mostrar todos los ítems en pantallas grandes
    if (isLargeScreen()) {
      showAllMenuItems();
    }
  
    // Función para manejar clics en los ítems del header
    menuItems.forEach(item => {
      const link = item.querySelector(".nav-link");
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Evitar comportamiento predeterminado
  
        if (isLargeScreen()) {
          const isSubmenuVisible = sidebarMenu.innerHTML.includes(link.textContent);
  
          if (isSubmenuVisible) {
            clearSidebarMenu(); // Si el submenú está visible, limpiar el menú lateral
          } else {
            showSingleSubmenu(item); // Mostrar solo el submenú del ítem seleccionado
          }
        }
      });
    });
  
    // Función para manejar el botón de abrir el menú lateral
    toggleMenu.addEventListener("click", function () {
      sidebar.style.display = "block";
      showAllMenuItems(); // Mostrar todos los ítems y submenús completos
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
      }
    });
    
  });
  