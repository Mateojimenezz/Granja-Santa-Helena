document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector("main"); // Selecciona el contenido principal

  // Mostrar/ocultar el menú al hacer clic en el botón externo
  toggleMenu.addEventListener("click", function () {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block"; // Muestra el menú lateral
      mainContent.style.marginLeft = "270px"; // Desplaza el contenido hacia la derecha
    } else {
      sidebar.style.display = "none"; // Oculta el menú lateral
      mainContent.style.marginLeft = "20"; // Restaura el contenido al margen original
    }
  });

  // Ocultar el menú al hacer clic en el botón "Cerrar"
  closeMenu.addEventListener("click", function () {
    sidebar.style.display = "none"; // Oculta el menú lateral
    mainContent.style.marginLeft = "30"; // Restaura el contenido al margen original
  });
});



  