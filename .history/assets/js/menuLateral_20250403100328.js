document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar"); // Menú lateral
  const toggleMenu = document.getElementById("toggleMenu"); // Botón para abrir/cerrar menú lateral
  const closeMenu = document.getElementById("closeMenu"); // Botón para cerrar menú lateral
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Configurar estado inicial: Ocultar el menú lateral
  sidebar.style.display = "none";

  // Función para verificar si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes (md o más)
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Configurar menú lateral en pantallas grandes
  function setupSidebarMenu() {
    clearSidebarMenu(); // Limpia el menú para evitar duplicados

    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector(".nav-link");

      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Si el ítem tiene un submenú, clónalo y configúralo
      if (submenu) {
        const clonedSubmenu = submenu.cloneNode(true);
        clonedSubmenu.style.display = "none"; // Mantén el submenú oculto
        sidebarItem.appendChild(clonedSubmenu);

        // Funcionalidad para mostrar/ocultar el submenú
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

  // Configurar submenús en el header para pantallas pequeñas
  function setupHeaderSubmenus() {
    menuItems.forEach(item => {
      const submenu = item.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = "none"; // Oculta los submenús inicialmente

        // Funcionalidad para mostrar/ocultar submenús en el header
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

  // Mostrar/ocultar el menú lateral al hacer clic en el botón toggle
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      if (isLargeScreen()) {
        setupSidebarMenu(); // Configura el menú lateral en pantallas grandes
        mainContent.style.marginLeft = "300px"; // Desplaza el contenido
      } else {
        clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
        mainContent.style.marginLeft = "0px"; // No desplaza el contenido
      }
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0px"; // Restaura el contenido
    }
  });

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      setupSidebarMenu(); // Configura el menú lateral en pantallas grandes
    } else {
      setupHeaderSubmenus(); // Configura los submenús en el header
    }
  });

  // Configuración inicial al cargar la página
  if (isLargeScreen()) {
    setupSidebarMenu(); // Configura el menú lateral en pantallas grandes
  } else {
    setupHeaderSubmenus(); // Configura los submenús en el header en pantallas pequeñas
  }
});








  