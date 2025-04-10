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
      mainContent.style.marginLeft = "200px"; // Ajusta el margen dinámicamente para evitar que quede oculto
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral automáticamente en pantallas pequeñas
      mainContent.style.marginLeft = "0px"; // Asegura que el contenido no se desplace
    }
  });
  
});

