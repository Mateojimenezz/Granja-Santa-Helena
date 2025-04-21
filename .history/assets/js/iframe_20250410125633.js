document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item"); // Selecciona todos los ítems del menú
    const iframeContent = document.getElementById("iframe-content"); // El iframe donde cargarás las páginas
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
  
        const page = this.getAttribute("data-page"); // Obtiene el valor del atributo data-page
        iframeContent.src = ".."; // Cambia el src del iframe para cargar la página
      });
    });
  });
  
  
  
  
  