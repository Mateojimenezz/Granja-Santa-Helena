document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const iframeContent = document.getElementById("iframe-content");
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault(); // Evita recargar la página
  
        const page = this.getAttribute("data-page"); // Obtén la página asociada
        iframeContent.src = page; // Cambia el src del iframe para cargar la nueva página
      });
    });
  });
  