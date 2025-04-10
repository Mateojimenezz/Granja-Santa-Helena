document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Verifica si la pantalla es grande
  function isLargeScreen() {
    console.log("Verificando si la pantalla es grande:", window.innerWidth >= 768);
    return window.innerWidth >= 768; // Pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    console.log("Limpiando el contenido del menú lateral.");
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Mostrar submenús en el menú lateral (pantallas grandes)
  function showSubmenusInSidebar() {
    console.log("Ejecutando 'showSubmenusInSidebar' para pantallas grandes.");
    clearSidebarMenu();

    menuItems.forEach((item, index) => {
      console.log(`Procesando ítem del menú superior ${index + 1}:`, item);
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");

      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Si el ítem tiene submenú, clónalo y añádelo al menú lateral
      if (submenu) {
        console.log("Submenú encontrado y clonado:", submenu);
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.classList.add("submenu-visible"); // Forzar visibilidad inicial

        // Manejo de sub-submenús dentro del submenú
        const subSubmenus = clonedSubmenu.querySelectorAll(".sub-submenu");
        console.log("Sub-submenús encontrados:", subSubmenus);

        subSubmenus.forEach((subSubmenu, subIndex) => {
          console.log(`Procesando sub-submenú ${subIndex + 1}:`, subSubmenu);
          subSubmenu.classList.add("sub-submenu-hidden"); // Ocultos inicialmente

          const parentItem = subSubmenu.closest("li"); // Ítem padre del sub-submenú
          const parentLink = parentItem.querySelector(".nav-link");
          console.log("Enlace padre del sub-submenú:", parentLink);

          if (parentLink) {
            // Alternar visibilidad del sub-submenú al hacer clic en el enlace padre
            parentLink.addEventListener("click", function (e) {
              e.preventDefault(); // Evitar redirección
              console.log("Clic detectado en:", parentLink);

              if (subSubmenu.classList.contains("sub-submenu-hidden")) {
                console.log("Mostrando sub-submenú.");
                subSubmenu.classList.remove("sub-submenu-hidden");
                subSubmenu.classList.add("sub-submenu-visible");
              } else {
                console.log("Ocultando sub-submenú.");
                subSubmenu.classList.remove("sub-submenu-visible");
                subSubmenu.classList.add("sub-submenu-hidden");
              }
            });
          } else {
            console.warn("No se encontró el enlace padre para este sub-submenú.");
          }
        });

        sidebarItem.appendChild(clonedSubmenu); // Añade el submenú al ítem
      } else {
        console.warn("No se encontró submenú en este ítem del menú superior.");
      }

      sidebarMenu.appendChild(sidebarItem); // Añade el ítem al menú lateral
    });

    sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
    mainContent.style.marginLeft = "300px"; // Desplaza el contenido en pantallas grandes
  }

  // Configurar submenús en pantallas pequeñas (header)
  function setupHeaderSubmenus() {
    console.log("Ejecutando 'setupHeaderSubmenus' para pantallas pequeñas.");
    menuItems.forEach((item, index) => {
      console.log(`Procesando ítem del menú superior ${index + 1} en header:`, item);
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        console.log("Submenú encontrado en header:", submenu);
        submenu.style.display = "none"; // Oculta los submenús inicialmente

        // Añadir funcionalidad de mostrar/ocultar submenú al hacer clic
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", function (e) {
          e.preventDefault();
          console.log("Clic detectado en enlace del header:", link);
          submenu.style.display = submenu.style.display === "block" ? "none" : "block"; // Alterna la visibilidad del submenú
        });

        // Lógica adicional para sub-submenús dentro del header
        const subSubmenus = submenu.querySelectorAll(".sub-submenu");
        subSubmenus.forEach((subSubmenu, subIndex) => {
          console.log(`Procesando sub-submenú ${subIndex + 1} en header:`, subSubmenu);
          subSubmenu.style.display = "none"; // Ocultar inicialmente los sub-submenús

          const parentItem = subSubmenu.closest("li"); // Ítem padre del sub-submenú
          const parentLink = parentItem.querySelector(".nav-link");

          if (parentLink) {
            parentLink.addEventListener("click", function (e) {
              e.preventDefault();
              console.log("Clic detectado en enlace padre del header:", parentLink);
              subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block"; // Alternar visibilidad
            });
          } else {
            console.warn("No se encontró el enlace padre para este sub-submenú en header.");
          }
        });
      }
    });

    sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
    mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      console.log("Redimensionando: Activando lógica para pantallas grandes.");
      showSubmenusInSidebar(); // Muestra submenús en el menú lateral
    } else {
      console.log("Redimensionando: Activando lógica para pantallas pequeñas.");
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



