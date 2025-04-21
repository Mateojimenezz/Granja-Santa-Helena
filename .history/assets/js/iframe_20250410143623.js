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
  
        // Obtiene el valor dinámico del atributo data-page
        const page = this.getAttribute("data-page");
  
        if (page) {
          iframeContent.src = page; // Cambia dinámicamente el src del iframe
          console.log(`Cargando la página: ${page}`); // Mensaje de depuración para verificar la carga
        } else {
          console.warn("El atributo 'data-page' no está definido en este ítem."); // Manejo de errores
        }
      });
    });
  });
  
  
  
  
  
  