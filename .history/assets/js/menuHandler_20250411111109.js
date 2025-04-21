/* aqui se manejael menu lateral , la manera en que se 
desplaza cuando se abre el menu igual en pantalla pequeña  con los item del header  */
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar"); // Menú lateral
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú superior
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral

  // Ocultar el menú lateral inicialmente
  sidebar.style.display = "none";

  // Función que verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes
  }

  // Limpia el contenido del menú lateral
  function clearSidebarMenu() {
    sidebarMenu.innerHTML = ""; // Limpia el menú lateral
  }

  // Mostrar el submenú en el menú lateral al hacer clic en un ítem del header
 // Mostrar el submenú en el menú lateral al hacer clic en un ítem del header
function showSubmenuInSidebar(item) {
  clearSidebarMenu(); // Limpia el menú lateral antes de añadir contenido

  // Lista de íconos específicos para cada ítem
  const icons = [
    "bi bi-people",        // Ícono para el primer ítem (Usuarios)
    "bi bi-box-seam",      // Ícono para el segundo ítem (Inventarios)
    "bi bi-pencil-square", // Ícono para el tercer ítem (Registro de Producción)
    "bi bi-heart-pulse",   // Ícono para el cuarto ítem (Salud Animal)
    "bi bi-cash"           // Ícono para el quinto ítem (Ventas)
  ];

  const submenu = item.querySelector(".submenu");
  const link = item.querySelector(".nav-link");

  const sidebarItem = document.createElement("li");
  sidebarItem.classList.add("nav-item");

  // Clona el enlace principal
  const clonedLink = link.cloneNode(true);

  // Obtener índice del ítem para asignar el ícono adecuado
  const index = Array.from(menuItems).indexOf(item);

  // Crear y agregar ícono específico al lado del enlace
  const iconLeft = document.createElement("i");
  iconLeft.className = `icon-left ${icons[index]}`; // Ícono según el índice
  iconLeft.style.marginRight = "10px"; // Espacio entre ícono y texto
  iconLeft.style.fontSize = "1.2rem"; // Tamaño del ícono
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
      const parentItem = subSubmenu.closest("li");
      const parentLink = parentItem.querySelector(".nav-link");

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
    container.style.marginLeft = "250px"; // Desplaza el contenido en pantallas grandes
    container.style.maxWidth = `calc(100% - ${sidebar.offsetWidth}px)`; // Reduce el ancho según el sidebar
    container.style.overflowX = "hidden"; // Evita scroll horizontal
    container.style.boxSizing = "border-box"; // Ajusta el tamaño incluyendo paddings y bordes
  } else {
    container.style.marginLeft = "0px"; // No desplaza el contenido en pantallas pequeñas
  }
}

  
  // Eventos de clic en los ítems del menú superior (header)
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault();

      showSubmenuInSidebar(item); // Muestra el submenú en el menú lateral
    });
  });
  
  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      sidebar.style.display = "block"; // Mantén visible el menú lateral en pantallas grandes
      container.style.marginLeft = "200px"; // Ajusta el margen dinámicamente para evitar que quede oculto
      container.style.marginTop= "270px";
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral automáticamente en pantallas pequeñas
      mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
    }
  });
  
});

