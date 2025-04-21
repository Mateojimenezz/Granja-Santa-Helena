document.addEventListener("DOMContentLoaded", function () {
    const iframeContent = document.getElementById("iframe-content"); // Selecciona el iframe
  
    if (!iframeContent) {
      console.error("No se encontró el elemento con id 'iframe-content'");
      return; // Detén la ejecución si el iframe no existe
    }
  
    const menuItems = document.querySelectorAll(".menu-item"); // Selecciona los ítems del menú
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault(); // Evita recargar la página
  
        const page = this.getAttribute("data-page"); // Obtiene el valor del atributo data-page
        iframeContent.src = pag"; // Cambia el src del iframe con la página seleccionada
      });
    });
  });
  
  
  
  
  