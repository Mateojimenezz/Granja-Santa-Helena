document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.getElementById("toggleMenu");
    const closeMenu = document.getElementById("closeMenu");
    const sidebar = document.getElementById("sidebar");
  
    // Mostrar/ocultar el menú al hacer clic en el botón externo
    toggleMenu.addEventListener("click", function () {
      sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
      mainContent.style.marginLeft = sidebar.classList.contains("open") ? "250px" : "0";
    });
    });
  
    // Ocultar el menú al hacer clic en el botón "Cerrar"
    closeMenu.addEventListener("click", function () {
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "0";
    });
  });
  

  