/* aqui se maneja los botones abrir y cerar del menu lateral y el menu del
 header que me abre el menu lateral 
con cada item del menu al que le doy clic en el header */

document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Función que verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Mostrar ítems del menú en el menú lateral con submenús y sub-submenús
// Mostrar ítems del menú en el menú lateral con submenús y sub-submenús
function configureSidebarMenu() {
  clearSidebarMenu();

  menuItems.forEach(item => {
    const submenu = item.querySelector(".submenu");
    const link = item.querySelector(".nav-link");

    const sidebarItem = document.createElement("li");
    sidebarItem.classList.add("nav-item");

    // Clona el enlace principal
    const clonedLink = link.cloneNode(true);

    // Crear y agregar ícono a la izquierda del enlace
    const iconLeft = document.createElement("i");
    iconLeft.className = "icon-left bi bi-people"; // icono
    
    clonedLink.prepend(iconLeft); // Añade el ícono al inicio del enlace

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
        mainContent.style.maxWidth = `calc(100% - ${sidebar.offsetWidth}px)`; // Reduce el ancho según el sidebar
        mainContent.style.overflowX = "hidden"; // Evita scroll horizontal
        mainContent.style.boxSizing = "border-box"; // Ajusta el tamaño incluyendo paddings y bordes

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
      mainContent.style.marginLeft = "200px"; // Restaura el contenido en pantalla grande
    }
  });

  // Ajuste inicial al cargar la página
  configureSidebarMenu(); // Configura el menú lateral en ambos tamaños de pantalla
});








  