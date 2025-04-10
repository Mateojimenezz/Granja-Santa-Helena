document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main");

  // Función que verifica el tamaño de la pantalla
  function isLargeScreen() {
    return window.innerWidth >= 768; // Pantallas md o más grandes
  }

  if (isLargeScreen()) {
    // Mostrar/ocultar el menú al hacer clic en el botón
    toggleMenu.addEventListener("click", function () {
      if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block";
        mainContent.style.marginLeft = "270px";
      } else {
        sidebar.style.display = "none";
        mainContent.style.marginLeft = "0";
      }
    });

    closeMenu.addEventListener("click", function () {
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "20px";
    });
  }
});







  