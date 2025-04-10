document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Mostrar submenús en el menú lateral (pantallas grandes)
  function showSubmenusInSidebar() {
    clearSidebarMenu();
  
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");
  
      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");
  
      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);
  
      // Si el ítem tiene submenú, clónalo y añádelo al menú lateral
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "block"; // Submenú visible
  
        // Manejo de sub-submenús dentro del menú lateral
        const subSubmenus = clonedSubmenu.querySelectorAll(".sub-submenu");
        subSubmenus.forEach(subSubmenu => {
          subSubmenu.style.display = "none"; // Ocultos inicialmente
  
          const parentItem = subSubmenu.closest("li"); // Ítem padre del sub-submenú
          const parentLink = parentItem.querySelector(".nav-link");
  
          // Alternar visibilidad del sub-submenú al hacer clic en el enlace padre
          parentLink.addEventListener("click", function (e) {
            e.preventDefault(); // Evitar redirección
            subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block"; // Alternar visibilidad
          });
        });
  
        sidebarItem.appendChild(clonedSubmenu); // Añade el submenú al ítem
      }
  
      sidebarMenu.appendChild(sidebarItem); // Añade el ítem al menú lateral
    });
  
    sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
  }
  

  // Configurar submenús en pantallas pequeñas (header)
  function setupHeaderSubmenus() {
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Oculta los submenús inicialmente

        // Añadir funcionalidad de mostrar/ocultar submenú al hacer clic
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          submenu.style.display = submenu.style.display === "block" ? "none" : "block"; // Alterna la visibilidad del submenú
        });

        // Lógica adicional para sub-submenús dentro del header
        const subSubmenus = submenu.querySelectorAll(".sub-submenu");
        subSubmenus.forEach(subSubmenu => {
          subSubmenu.style.display = "none"; // Ocultar inicialmente los sub-submenús

          const parentItem = subSubmenu.closest("li"); // Ítem padre del sub-submenú
          const parentLink = parentItem.querySelector(".nav-link");

          // Alternar visibilidad del sub-submenú al hacer clic en el enlace padre
          parentLink.addEventListener("click", function (e) {
            e.preventDefault();
            subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block"; // Alternar visibilidad
          });
        });
      }
    });

    sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
    mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      showSubmenusInSidebar(); // Muestra submenús en el menú lateral
    } else {
      setupHeaderSubmenus(); // Configura los submenús en el header
    }
  });

  // Ajuste inicial al cargar la página
  if (isLargeScreen()) {
    showSubmenusInSidebar(); // Muestra submenús en el menú lateral
  } else {
    setupHeaderSubmenus(); // Configura los submenús en el header
  }
});



