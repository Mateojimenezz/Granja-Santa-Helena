/* aqui se maneja los botones abrir y cerar del menu lateral y el  */

document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Selecciona el contenido principal
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Enlaces del menú superior
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Función que verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes (md o más)
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Mostrar todos los ítems del header en el menú lateral (submenús ocultos inicialmente)
  function showHeaderItemsInSidebar() {
    clearSidebarMenu(); // Limpia el menú lateral antes de llenarlo

    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");

      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Si el ítem tiene submenú, clónalo pero mantenlo oculto inicialmente
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "none"; // Mantén oculto el submenú inicialmente
        sidebarItem.appendChild(clonedSubmenu);

        // Evento para mostrar/ocultar el submenú al hacer clic en el enlace
        clonedLink.addEventListener("click", function (e) {
          e.preventDefault(); // Evita el comportamiento predeterminado del enlace
          clonedSubmenu.style.display = clonedSubmenu.style.display === "block" ? "none" : "block";
        });
      }

      // Añade el ítem completo al menú lateral
      sidebarMenu.appendChild(sidebarItem);
    });
  }

  // Mostrar solo el submenú de un ítem del header en el menú lateral
  function showSubmenuInSidebar(item) {
    clearSidebarMenu(); // Limpia el menú lateral antes de añadir contenido

    const submenu = item.querySelector(".submenu");
    const link = item.querySelector(".nav-link");

    const sidebarItem = document.createElement("li");
    sidebarItem.classList.add("nav-item");

    // Clona el enlace principal
    const clonedLink = link.cloneNode(true);
    sidebarItem.appendChild(clonedLink);

    // Clona y muestra el submenú correspondiente
    if (submenu) {
      const clonedSubmenu = submenu.cloneNode(true);
      clonedSubmenu.style.display = "block"; // Asegúrate de que el submenú sea visible
      sidebarItem.appendChild(clonedSubmenu);
    }

    // Añade el ítem completo al menú lateral
    sidebarMenu.appendChild(sidebarItem);
  }

  // Eventos de clic en los ítems del menú superior (header)
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace

      showSubmenuInSidebar(item); // Muestra el submenú en el menú lateral
      sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantalla grande
      }
    });
  });

  // Mostrar/ocultar el menú desde el botón toggle
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      showHeaderItemsInSidebar(); // Muestra todos los ítems del header en el menú lateral
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantalla grande
      } else {
        mainContent.style.marginLeft = "0px"; // No desplaza el contenido en pantalla pequeña
      }
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
      } else {
        mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
      }
    }
  });

  // Cerrar el menú lateral
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    if (isLargeScreen()) {
      mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
    } else {
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
    }
  });

  // Ajuste inicial al cargar la página
  if (isLargeScreen()) {
    showHeaderItemsInSidebar(); // Muestra todos los ítems del header en el menú lateral
  } else {
    clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      showHeaderItemsInSidebar(); // Asegura que el menú lateral muestre todos los ítems
    } else {
      clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
    }
  });
});








  