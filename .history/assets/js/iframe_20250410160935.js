document.addEventListener("DOMContentLoaded", function () {
    const iframeContent = document.getElementById("iframe-content");
  
    if (!iframeContent) {
      console.error("No se encontró el elemento con id 'iframe-content'");
      return; // Detén la ejecución si el iframe no existe
    }
  
    const menuItems = document.querySelectorAll(".menu-item");
    if (menuItems.length === 0) {
      console.error("No se encontraron elementos con la clase 'menu-item'");
      return; // Detén la ejecución si no hay elementos del menú
    }
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        const page = this.getAttribute("data-page");
        if (page) {
          iframeContent.src = page; // Cambia dinámicamente el src del iframe
          console.log(`Cargando la página: ${page}`);
        } else {
          console.warn("El atributo 'data-page' no está definido en este ítem.");
        }
      });
    });
  });
  
  
  
  
  
  