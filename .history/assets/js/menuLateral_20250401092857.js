/* aqui se maneja el div laterl donde con los botones abrir y cerrar el menu lateral y los item del menu 
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
  if (isLargeScreen()) {
    toggleMenu.addEventListener("click", function () {
      if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block"; // Muestra el menú lateral
        mainContent.style.marginLeft = "270px"; // Desplaza el contenido hacia la derecha
      } else {
        sidebar.style.display = "none"; // Oculta el menú lateral
        mainContent.style.marginLeft = "20px"; // Restaura el contenido al margen original
      }
    });

    closeMenu.addEventListener("click", function () {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "20px"; // Restaura el contenido al margen original
    });

    // Funcionalidad para los ítems del menú superior
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace

        if (sidebar.style.display === "block") {
          sidebar.style.display = "none"; // Oculta el menú lateral
          mainContent.style.marginLeft = "20px"; // Restaura el contenido al margen original
        } else {
          sidebar.style.display = "block"; // Despliega el menú lateral
          mainContent.style.marginLeft = "270px"; // Desplaza el contenido principal
        }
      });
    });
  }

  // Opcional: ocultar el menú inmediatamente si el usuario redimensiona a una pantalla pequeña
  window.addEventListener("resize", function () {
    if (!isLargeScreen()) {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0"; // Restaura el contenido al margen original
    }
  });
});







  