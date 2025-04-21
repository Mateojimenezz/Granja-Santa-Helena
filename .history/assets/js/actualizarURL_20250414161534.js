document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Captura todos los enlaces con la clase `menu-link`
    const iframe = document.getElementById('iframe-content'); // Referencia al iframe
  
    if (!iframe) {
      console.error("El iframe con id 'iframe-content' no se encontró en el DOM.");
      return;
    }
  
    // Asignar eventos de clic a los enlaces del menú
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitamos la acción predeterminada del clic
  
        const targetUrl = this.getAttribute('href'); // Obtenemos la URL de destino
        const pageTitle = this.getAttribute('data-title'); // Obtenemos el título de la página
  
        if (!targetUrl || !pageTitle) {
          console.error("El enlace no tiene un href o data-title válido.");
          return;
        }
  
        // Cambiar el contenido del iframe
        iframe.src = targetUrl;
  
        // Actualizar la barra de URL y el título dinámicamente
        history.pushState({ url: targetUrl, title: pageTitle }, pageTitle, targetUrl);
        document.title = pageTitle;
  
        console.log(`Navegando a: ${targetUrl}, Título: ${pageTitle}`);
      });
    });
  
    // Manejar retroceso y avance en el historial
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        const { url, title } = event.state;
        iframe.src = url; // Cambiar el contenido del iframe según el historial
        document.title = title; // Actualizar el título según el historial
        console.log(`Retroceso/avance a: ${url}, Título: ${title}`);
      }
    });
  });
  
  