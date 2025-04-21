document.addEventListener("DOMContentLoaded", function () {
    const iframeContent = document.getElementById("iframe-content");
    const sidebar = document.getElementById("sidebar");
    const sidebarMenu = document.getElementById("sisidebarMenu");
    const menuItemsHeader = document.querySelectorAll(".menu-item-header"); // Ítems del header
    const menuItemsSidebar = document.querySelectorAll(".menu-item"); // Ítems del menú lateral
  
    // Verifica la existencia de elementos clave
    if (!iframeContent || !sidebar || !sidebarMenu || (menuItemsHeader.length === 0 && menuItemsSidebar.length === 0)) {
      console.error("Uno o más elementos necesarios no existen en el DOM.");
      return; // Detén la ejecución si falta algo
    }
  
    // Función para cargar una página en el iframe
    function loadPage(page) {
      if (page) {
        iframeContent.src = page; // Carga la página en el iframe
        console.log(`Cargando la página en el iframe: ${page}`);
        // Oculta el menú lateral en pantallas pequeñas
        if (window.innerWidth < 768) {
          sidebar.style.display = "none";
        }
      } else {
        console.warn("El atributo 'data-page' no está definido.");
      }
    }
  
    // Manejador para ítems del header
    menuItemsHeader.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        loadPage(page);
  
        // Sincroniza el contenido del menú lateral
        const submenu = this.querySelector(".submenu");
        if (submenu) {
          sidebarMenu.innerHTML = ""; // Limpia el menú lateral
          const clonedSubmenu = submenu.cloneNode(true);
          clonedSubmenu.style.display = "block"; // Asegura que el submenú sea visible
          sidebarMenu.appendChild(clonedSubmenu);
          sidebar.style.display = "block"; // Muestra el menú lateral
        }
      });
    });
  
    // Manejador para ítems del menú lateral
    menuItemsSidebar.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        loadPage(page);
      });
    });
  
    // Ajusta el comportamiento del menú lateral al redimensionar la pantalla
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        sidebar.style.display = "block"; // Muestra el menú lateral en pantallas grandes
      } else {
        sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
      }
    });
  
    // Inicializa el estado del menú lateral según el tamaño de la pantalla
    if (window.innerWidth < 768) {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "block";
    }
  });
  
  
  
  
  
  
  