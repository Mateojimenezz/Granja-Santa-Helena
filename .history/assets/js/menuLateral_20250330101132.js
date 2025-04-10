document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.getElementById("toggleMenu");
    const closeMenu = document.getElementById("closeMenu");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector("main.container");
  
    // Mostrar/ocultar el menú y ajustar el contenido
    toggleMenu.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      mainContent.style.marginLeft = sidebar.classList.contains("open") ? "250px" : "0";
    });
  
    closeMenu.addEventListener("click", function () {
      sidebar.classList.remove("open");
      mainContent.style.marginLeft = "0";
    });
  });
  
  

  