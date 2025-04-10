/* aqui se maneja los botones abrir y cerar del menu lateral y el menu del
 header que me abre el menu lateral 
con cada item del menu al que le doy clic en el header */

document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del header
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Configura submenús en el header para pantallas pequeñas
  function setupHeaderSubmenus() {
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Oculta submenús inicialmente

        // Alterna visibilidad de los submenús en el header
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
      }
    });
  }

  // Configura el menú lateral para pantallas grandes
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

      // Configura submenús y sub-submenús
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "none";

        // Manejo de sub-submenús
        const subSubmenus = clonedSubmenu.querySelectorAll(".sub-submenu");
        subSubmenus.forEach(subSubmenu => {
          subSubmenu.style.display = "none"; // Oculta sub-submenús inicialmente
          const parentItem = subSubmenu.closest("li");
          const parentLink = parentItem.querySelector(".nav-link");

          parentLink.addEventListener("click", function (e) {
            e.preventDefault();
            subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block";
          });
        });

        sidebarItem.appendChild(clonedSubmenu);

        clonedLink.addEventListener("click", function (e) {
          e.preventDefault();
          clonedSubmenu.style.display = clonedSubmenu.style.display === "block" ? "none" : "block";
        });
      }

      sidebarMenu.appendChild(sidebarItem);
    });
  }

  // Detecta el tamaño de pantalla y configura los menús
  function adjustMenus() {
    if (isLargeScreen()) {
      console.log("Configurando menú lateral para pantalla grande");
      configureSidebarMenu(); // Menú lateral en pantallas grandes
      sidebar.style.display = "block";
      mainContent.style.marginLeft = "270px"; // Desplaza contenido
    } else {
      console.log("Configurando submenús para pantalla pequeña");
      setupHeaderSubmenus(); // Submenús en el header en pantallas pequeñas
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "0px";
    }
  }

  // Inicializa los menús según el tamaño de la pantalla
  adjustMenus();

  // Detecta cambios en el tamaño de la pantalla
  window.addEventListener("resize", adjustMenus);

  // Mostrar/ocultar menú lateral con toggle
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block";
      mainContent.style.marginLeft = "270px";
      configureSidebarMenu(); // Configura el menú lateral
    } else {
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "0px";
    }
  });

  // Botón para cerrar el menú lateral
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none";
    mainContent.style.marginLeft = "0px";
  });
});
