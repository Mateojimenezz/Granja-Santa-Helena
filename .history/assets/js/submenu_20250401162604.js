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
        sidebarItem.appendChild(clonedSubmenu);
      }

      sidebarMenu.appendChild(sidebarItem); // Añade el ítem al menú lateral
    });
  }

  // Restaurar submenús en el header (pantallas pequeñas)
  function restoreHeaderSubmenus() {
    clearSidebarMenu(); // Limpia el menú lateral
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "block"; // Submenús visibles en el header
      }
    });
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      showSubmenusInSidebar(); // Muestra submenús en el menú lateral
      mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
    } else {
      restoreHeaderSubmenus(); // Restaura los submenús al header en pantallas pequeñas
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido sin desplazamiento
    }
  });

  // Ajuste inicial al cargar la página
  if (isLargeScreen()) {
    showSubmenusInSidebar(); // Muestra submenús en el menú lateral
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
  } else {
    restoreHeaderSubmenus(); // Restaura los submenús al header en pantallas pequeñas
  }
});

