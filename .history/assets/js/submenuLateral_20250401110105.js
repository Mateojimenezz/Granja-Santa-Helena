document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Función para limpiar el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Función para mostrar el submenú del ítem seleccionado en el menú lateral
  function showSubmenuInSidebar(item) {
    clearSidebarMenu(); // Limpia el menú lateral antes de añadir nuevo contenido

    const link = item.querySelector(".nav-link"); // Enlace del ítem principal
    const submenu = item.querySelector(".submenu"); // Submenú relacionado

    if (submenu) {
      const sidebarItem = document.createElement("li");
      sidebarItem.classList.add("nav-item");

      // Clona el enlace principal y añádelo al menú lateral
      const clonedLink = link.cloneNode(true);
      sidebarItem.appendChild(clonedLink);

      // Clona el submenú y añádelo al menú lateral
      const clonedSubmenu = submenu.cloneNode(true);
      clonedSubmenu.style.display = "block"; // Asegura que el submenú sea visible en el menú lateral
      sidebarItem.appendChild(clonedSubmenu);

      sidebarMenu.appendChild(sidebarItem); // Añade el ítem completo al menú lateral
    }
  }

  // Evento de clic en los ítems del menú superior
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado

      showSubmenuInSidebar(item); // Muestra el submenú en el menú lateral
    });
  });

  // Ajuste inicial para pantallas grandes: mostrar todos los ítems
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes
  }

  if (isLargeScreen()) {
    // Mostrar todos los ítems y submenús en el menú lateral al cargar
    menuItems.forEach(item => showSubmenuInSidebar(item));
  }
});


  