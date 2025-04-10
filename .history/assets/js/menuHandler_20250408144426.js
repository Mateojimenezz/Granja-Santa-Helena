/* aqui se manejael menu lateral , la manera en que se 
desplaza cuando se abre el menu igual en pantalla pequeña  con los item del header  */
// Mostrar el submenú en el menú lateral al hacer clic en un ítem del header
function showSubmenuInSidebar(item) {
  clearSidebarMenu(); // Limpia el menú lateral antes de añadir contenido
  
  const submenu = item.querySelector(".submenu");
  const link = item.querySelector(".nav-link");
  
  const sidebarItem = document.createElement("li");
  sidebarItem.classList.add("nav-item");
  
  // Clona el enlace principal
  const clonedLink = link.cloneNode(true);

  // Añade un ícono a la izquierda del enlace principal
  const iconLeft = document.createElement("i");
  iconLeft.className = "icon-left bi bi-star"; // Cambia 'bi bi-star' por el ícono que prefieras
  clonedLink.prepend(iconLeft); // Añade el ícono al inicio del enlace
  
  sidebarItem.appendChild(clonedLink);
  
  // Clona y muestra el submenú correspondiente
  if (submenu) {
    const clonedSubmenu = submenu.cloneNode(true);
    clonedSubmenu.style.display = "block"; // Submenú visible

    // Manejo de sub-submenús dentro del submenú clonado
    const subSubmenus = clonedSubmenu.querySelectorAll(".sub-submenu");
    subSubmenus.forEach(subSubmenu => {
      subSubmenu.style.display = "none"; // Ocultar sub-submenús inicialmente
  
      const parentItem = subSubmenu.closest("li"); // Ítem padre del sub-submenú
      const parentLink = parentItem.querySelector(".nav-link");

      // Añade un ícono a la derecha del sub-submenú
      const iconRight = document.createElement("i");
      iconRight.className = "icon-right bi bi-arrow-right"; // Cambia 'bi bi-arrow-right' por el ícono que prefieras
      parentLink.appendChild(iconRight); // Añade el ícono al final del enlace
  
      // Alternar visibilidad del sub-submenú al hacer clic en el enlace padre
      parentLink.addEventListener("click", function (e) {
        e.preventDefault();
        subSubmenu.style.display = subSubmenu.style.display === "block" ? "none" : "block";
      });
    });
  
    sidebarItem.appendChild(clonedSubmenu); // Añade el submenú clonado al ítem
  }
  
  sidebarMenu.appendChild(sidebarItem); // Añade el ítem completo al menú lateral
  
  sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
  if (isLargeScreen()) {
    mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantallas grandes
    mainContent.style.maxWidth = `calc(100% - ${sidebar.offsetWidth}px)`; // Reduce el ancho según el sidebar
    mainContent.style.overflowX = "hidden"; // Evita scroll horizontal
    mainContent.style.boxSizing = "border-box"; // Ajusta el tamaño incluyendo paddings y bordes
  } else {
    mainContent.style.marginLeft = "0px"; // No desplaza el contenido en pantallas pequeñas
  }
}
