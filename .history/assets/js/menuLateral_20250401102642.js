/* aqui se maneja  los botones abrir y cerrar del menu lateral y los item del menu 
en el header que tambien permiten abrir y cerrar el menu lateral */
document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Selecciona el contenido principal
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Selecciona los enlaces del menú superior

  // Función que verifica si la pantalla es grande
  function isLargeScreen() {
    return window.innerWidth >= 768; // Define pantallas grandes (md o más)
  }

  // Mostrar/ocultar el menú solo si la pantalla es grande
  
  // Opcional: ocultar el menú inmediatamente si el usuario redimensiona a una pantalla pequeña
  window.addEventListener("resize", function () {
    if (!isLargeScreen()) {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0px"; // Restaura el contenido al margen original
    }
  });
});







  