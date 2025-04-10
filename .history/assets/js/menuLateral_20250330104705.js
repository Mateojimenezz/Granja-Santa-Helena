document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Selecciona el contenido principal
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Selecciona los enlaces del menú superior

  // Mostrar/ocultar el menú al hacer clic en el botón externo
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      mainContent.style.marginLeft = "270px"; // Desplaza el contenido hacia la derecha
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "0"; // Restaura el contenido al margen original
    }
  });

  // Ocultar el menú al hacer clic en el botón "Cerrar"
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    mainContent.style.marginLeft = "30"; // Restaura el contenido al margen original
  });

    // Agregar funcionalidad para los ítems del menú superior
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace
      sidebar.style.display = "block"; // Despliega el menú lateral
      mainContent.style.marginLeft = "250px"; // Desplaza el contenido principal
      alert(`Abriste el menú desde el enlace: ${link.getAttribute("data-target")}`);
    });
  });
});



  