document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Función para clonar y mostrar submenús (y sub-submenús)
  function cloneMenuItems(items, container) {
    items.forEach(item => {
      const link = item.querySelector(".nav-link");
      const submenu = item.querySelector(".submenu");

      // Crear un nuevo ítem en el menú lateral
      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clonar el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Si hay un submenú, clónalo y agrégalo
      if (submenu) {
        const clonedSubmenu = document.createElement("ul");
        clonedSubmenu.classList.add("submenu-cloned");
        clonedSubmenu.style.display = "block"; // Temporal: visible siempre para depuración

        // Llamar recursivamente para clonar posibles sub-submenús
        const subItems = submenu.querySelectorAll(":scope > li");
        cloneMenuItems(subItems, clonedSubmenu);

        sidebarItem.appendChild(clonedSubmenu); // Añadir submenú clonado al ítem
      }

      container.appendChild(sidebarItem); // Añadir ítem al contenedor
    });
  }

  // Mostrar menú lateral con submenús
  function showSubmenusInSidebar() {
    clearSidebarMenu();

    const menuItemsList = document.querySelectorAll(".nav-item");
    cloneMenuItems(menuItemsList, sidebarMenu); // Clona los ítems del menú principal

    sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido
  }

  // Configurar para pantallas pequeñas
  function setupHeaderSubmenus() {
    sidebar.style.display = "none";
    mainContent.style.marginLeft = "0px";
  }

  // Ajuste inicial al cargar la página
  if (window.innerWidth >= 768) {
    showSubmenusInSidebar();
  } else {
    setupHeaderSubmenus();
  }

  // Redimensionar dinámico
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      showSubmenusInSidebar();
    } else {
      setupHeaderSubmenus();
    }
  });
});



