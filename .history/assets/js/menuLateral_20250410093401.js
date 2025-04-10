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








  