/* aqui se maneja los botones abrir y cerar del menu lateral y el menu del
 header que me abre el menu lateral 
con cada item del menu al que le doy clic en el header */

document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior (header)
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Función que verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Configuración de submenús en el header
  function setupHeaderSubmenus() {
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Ocultar submenús inicialmente

        // Agregar evento para alternar visibilidad del submenú
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          console.log("Clic en el menú del header:", link);
          submenu.style.display = submenu.style.display === "block" ? "none" : "block"; // Alternar visibilidad
        });
      }
    });
  }

  // Configuración del menú lateral (para pantallas grandes)
  function configureSidebarMenu() {
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
        clonedSubmenu.style.display = "none"; // Ocultar submenú inicialmente

        // Manejo de sub-submenús
        const subSubmenus = clonedSubmenu.querySelectorAll(".sub-submenu");
        subSubmenus.forEach(subSubmenu => {
          subSubmenu.style.display = "none"; // Ocultar sub-submenús inicialmente
          const parentItem = subSubmenu.closest("li");
          const parentLink = parentItem.querySelector(".nav-link");

          // Alternar visibilidad del sub-submenú al hacer clic en el enlace padre
          parentLink.addEventListener("click", function (e) {
            e.preventDefault();
            subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block";
          });
        });

        sidebarItem.appendChild(clonedSubmenu);

        // Alternar visibilidad del submenú al hacer clic en el enlace principal
        clonedLink.addEventListener("click", function (e) {
          e.preventDefault();
          clonedSubmenu.style.display = clonedSubmenu.style.display === "block" ? "none" : "block";
        });
      }

      sidebarMenu.appendChild(sidebarItem);
    });
  }

  // Mostrar/ocultar el menú desde el botón toggle
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      configureSidebarMenu(); // Configura el menú lateral con submenús y sub-submenús
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantalla grande
      }
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "0px"; // Restaura el contenido en pantalla grande
      }
    }
  });

  // Cerrar el menú lateral
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    if (isLargeScreen()) {
      mainContent.style.marginLeft = "0px"; // Restaura el contenido en pantalla grande
    }
  });

  // Ajuste inicial al cargar la página
  if (isLargeScreen()) {
    configureSidebarMenu(); // Configura el menú lateral en pantallas grandes
  } else {
    setupHeaderSubmenus(); // Configura los submenús en el header en pantallas pequeñas
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      configureSidebarMenu(); // Configura el menú lateral en pantallas grandes
    } else {
      setupHeaderSubmenus(); // Configura los submenús en el header en pantallas pequeñas
    }
  });
});
