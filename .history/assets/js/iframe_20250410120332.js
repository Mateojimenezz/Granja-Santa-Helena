document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item"); // Enlaces del menú
    const iframeContent = document.getElementById("iframe-content"); // Referencia al iframe
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace recargue la página
  
        const page = this.getAttribute("data-page"); // Obtén la página asociada
        iframeContent.src = page; // Actualiza el contenido del iframe
      });
    });
  });
  
  
  