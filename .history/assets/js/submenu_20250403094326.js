document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
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

      // Si el ítem tiene submenú, clónalo y configúralo
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "none"; // Submenú oculto inicialmente
        sidebarItem.appendChild(clonedSubmenu);

        // Añade funcionalidad para alternar el submenú en pantallas grandes
        clonedLink.addEventListener("click", function (e) {
          e.preventDefault();
          clonedSubmenu.style.display = clonedSubmenu.style.display === "block" ? "none" : "block";
        });
      }

      sidebarMenu.appendChild(sidebarItem); // Añade el ítem al menú lateral
    });

    sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
  }

  // Configurar submenús en el header (pantallas pequeñas)
  function setupHeaderSubmenus() {
    clearSidebarMenu(); // Limpia el menú lateral
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Oculta los submenús inicialmente

        // Añadir funcionalidad de mostrar/ocultar submenú al hacer clic
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
      }
    });

    sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
    mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
  }

  // Mostrar/ocultar el menú lateral en pantallas pequeñas
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      mainContent.style.marginLeft = "0px"; // No desplaza el contenido
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido sin desplazamiento
    }
  });

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



