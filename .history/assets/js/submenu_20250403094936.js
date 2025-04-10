document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar"); // Menú lateral
  const toggleMenu = document.getElementById("toggleMenu"); // Botón para abrir/cerrar menú lateral
  const closeMenu = document.getElementById("closeMenu"); // Botón para cerrar menú lateral
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Función para verificar si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Configura los submenús en el header para pantallas pequeñas
  function setupHeaderSubmenus() {
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Oculta los submenús inicialmente

        // Añadir funcionalidad para mostrar/ocultar submenús en pantallas pequeñas
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
      }
    });

    sidebar.style.display = "none"; // Asegura que el menú lateral esté oculto en pantallas pequeñas
    mainContent.style.marginLeft = "0px"; // Mantiene el contenido sin desplazamiento
  }

  // Configura el menú lateral para pantallas grandes
  function setupSidebarMenu() {
    clearSidebarMenu();

    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");

      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Clona y configura el submenú en el menú lateral
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "none"; // Submenú oculto inicialmente
        sidebarItem.appendChild(clonedSubmenu);

        // Añade funcionalidad para alternar el submenú en el menú lateral
        clonedLink.addEventListener("click", function (e) {
          e.preventDefault();
          clonedSubmenu.style.display = clonedSubmenu.style.display === "block" ? "none" : "block";
        });
      }

      sidebarMenu.appendChild(sidebarItem);
    });

    sidebar.style.display = "block"; // Asegura que el menú lateral esté visible
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
  }

  // Mostrar/ocultar el menú lateral al hacer clic en el botón toggle
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      setupSidebarMenu(); // Configura el menú lateral al abrirlo
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
      } else {
        mainContent.style.marginLeft = "0px"; // No desplaza el contenido en pantallas pequeñas
      }
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0px"; // Restaura el contenido
    }
  });

  // Cerrar el menú lateral al hacer clic en el botón cerrar
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    mainContent.style.marginLeft = "0px"; // Restaura el contenido
  });

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      setupSidebarMenu(); // Configura el menú lateral en pantallas grandes
    } else {
      setupHeaderSubmenus(); // Configura los submenús en el header en pantallas pequeñas
    }
  });

  // Configuración inicial al cargar la página
  if (isLargeScreen()) {
    setupSidebarMenu(); // Configura el menú lateral en pantallas grandes
  } else {
    setupHeaderSubmenus(); // Configura los submenús en el header en pantallas pequeñas
  }
});




