/* aqui se manejael submenu lateral , la manera en que se abre ese menu con los item del header */
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Selecciona el contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
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
      clonedSubmenu.style.display = "block"; // Submenú visible
      sidebarItem.appendChild(clonedSubmenu);
    }

    sidebarMenu.appendChild(sidebarItem);
  }

  // Eventos de clic en los ítems del menú superior (header)
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault();

      showSubmenuInSidebar(item); // Muestra el submenú en el menú lateral
      sidebar.style.display = "block"; // Asegúrate de que el menú lateral esté visible
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido sin desplazamiento
    });
  });

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
      sidebar.style.display = "none"; // Oculta el menú lateral automáticamente en pantallas pequeñas
      mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
    }
  });
});
