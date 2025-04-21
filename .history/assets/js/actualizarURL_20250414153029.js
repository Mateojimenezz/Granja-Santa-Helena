document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Seleccionamos los enlaces del menú
    const iframe = document.getElementById('iframe-content'); // Seleccionamos el iframe
  
    // Verificar que iframe no sea null
    if (!iframe) {
      console.error("El iframe con id 'iframe-content' no se encontró.");
      return;
    }
  
    // Agregar eventos de clic a los enlaces
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  
        const targetUrl = this.getAttribute('href'); // Obtener la URL de destino
        if (!targetUrl) {
          console.error("El atributo href del enlace está vacío o no es válido.");
          return;
        }
  
        iframe.src = targetUrl; // Cambiar el contenido del iframe
        console.log(`Contenido del iframe cambiado a: ${targetUrl}`);
      });
    });
  });
  