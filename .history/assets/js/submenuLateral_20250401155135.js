/* aqui se manejael submenu lateral , la manera en que se abre ese menu con los item del header */

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

  // Mostrar todos los ítems en el menú lateral (pantallas grandes)
  function showAllMenuItems() {
    clearSidebarMenu(); // Limpia el menú lateral antes de llenarlo

    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");

      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Si el ítem tiene submenú, clónalo también
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "block"; // Asegúrate de que el submenú sea visible
        sidebarItem.appendChild(clonedSubmenu);
      }

      // Añade el ítem completo al menú lateral
      sidebarMenu.appendChild(sidebarItem);
    });
  }

  // Mostrar el submenú en el menú lateral al hacer clic en un ítem
  function showSubmenuInSidebar(item) {
    clearSidebarMenu(); // Limpia el menú lateral antes de añadir contenido

    const submenu = item.querySelector(".submenu");
    const link = item.querySelector(".nav-link");

    const sidebarItem = document.createElement("li");
    sidebarItem.classList.add("nav-item");

    // Clona el enlace principal
    const clonedLink = link.cloneNode(true);
    sidebarItem.appendChild(clonedLink);

    // Clona el submenú y añádelo al menú lateral
    if (submenu) {
      const clonedSubmenu = submenu.cloneNode(true);
      clonedSubmenu.style.display = "block"; // Asegúrate de que el submenú sea visible
      sidebarItem.appendChild(clonedSubmenu);
    }

    sidebarMenu.appendChild(sidebarItem); // Añade el ítem completo al menú lateral
  }

  // Eventos de clic en los ítems del menú superior
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace

      showSubmenuInSidebar(item); // Muestra el submenú en el menú lateral
    });
  });

  // Mostrar/ocultar el menú desde el botón lateral
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
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
    showAllMenuItems(); // Muestra todos los ítems en el menú lateral
  } else {
    clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      showAllMenuItems(); // Asegura que el menú lateral muestre todos los ítems
    } else {
      clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
    }
  });
});



  