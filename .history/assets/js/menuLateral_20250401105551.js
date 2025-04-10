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

  // Mostrar/ocultar el menú desde el botón lateral y ajustar comportamiento según tamaño de pantalla
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantalla grande
      } else {
        mainContent.style.marginLeft = "0px"; // No desplaza el contenido en pantalla pequeña
      }
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      if (isLargeScreen()) {
        mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
      } else {
        mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
      }
    }
  });

  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    if (isLargeScreen()) {
      mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
    } else {
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
    }
  });

  // Funcionalidad para los ítems del menú superior
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace

      if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block"; // Muestra el menú lateral
        if (isLargeScreen()) {
          mainContent.style.marginLeft = "270px"; // Desplaza el contenido en pantalla grande
        } else {
          mainContent.style.marginLeft = "0px"; // No desplaza en pantalla pequeña
        }
      } else {
        sidebar.style.display = "none"; // Oculta el menú lateral
        if (isLargeScreen()) {
          mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
        } else {
          mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
        }
      }
    });
  });

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (!isLargeScreen()) {
      sidebar.style.display = "none"; // Oculta el menú lateral automáticamente en pantallas pequeñas
      mainContent.style.marginLeft = "0px"; // Restaura el contenido al margen original
    }
  });
});







  