/* aqui se manejael submenu lateral , la manera en que se abre ese menu con los item del header */



  // Mostrar/ocultar el menú desde el botón lateral
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

  // Cerrar el menú lateral
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    if (isLargeScreen()) {
      mainContent.style.marginLeft = "20px"; // Restaura el contenido en pantalla grande
    } else {
      mainContent.style.marginLeft = "0px"; // Mantiene el contenido en pantalla pequeña
    }
  });

  // Ajuste inicial al cargar la página
  if (isLargeScreen()) {
    showAllMenuItems(); // Muestra todos los ítems en el menú lateral
  } else {
    clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
  }

  // Ajuste dinámico al redimensionar la pantalla
  window.addEventListener("resize", function () {
    if (isLargeScreen()) {
      showAllMenuItems(); // Asegura que el menú lateral muestre todos los ítems
    } else {
      clearSidebarMenu(); // Limpia el menú lateral en pantallas pequeñas
    }
  });
});



  