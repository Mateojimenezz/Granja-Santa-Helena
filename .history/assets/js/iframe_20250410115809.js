document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item"); // Ítems del menú
    const iframeContent = document.getElementById("iframe-content"); // El iframe que carga las páginas
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        const page = this.getAttribute("data-page"); // Obtiene la página asociada al ítem
        iframeContent.src = page; // Actualiza el src del iframe con la nueva página
      });
    });
  });
  
  