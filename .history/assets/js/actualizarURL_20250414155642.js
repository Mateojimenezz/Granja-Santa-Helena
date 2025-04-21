document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Capturamos todos los enlaces del menú
    const iframe = document.getElementById('iframe-content'); // Referencia al iframe
  
    // Verificamos que el iframe exista
    if (!iframe) {
      console.error("El iframe con id 'iframe-content' no se encontró en el DOM.");
      return;
    }
  
    // Asignamos eventos de clic a cada enlace del menú
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitamos que el enlace recargue la página
  
        const targetUrl = this.getAttribute('href'); // Obtenemos la URL del atributo href
        const pageTitle = this.getAttribute('data-title'); // Obtenemos el título de la página del atributo data-title
  
        // Validamos que los datos existan
        if (!targetUrl || !pageTitle) {
          console.error("El enlace no tiene un href o data-title válido.");
          return;
        }
  
        // Cambiamos el contenido del iframe
        iframe.src = targetUrl;
  
        // Actualizamos la barra de URL y el título de la página
        history.pushState({ url: targetUrl, title: pageTitle }, pageTitle, targetUrl);
        document.title = pageTitle; // Actualizamos el título de la pestaña
  
        console.log(`Navegando a: ${targetUrl}, Título: ${pageTitle}`);
      });
    });
  
    // Manejamos el evento popstate (retroceso o avance en el historial)
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        const { url, title } = event.state;
        iframe.src = url; // Cambiamos el contenido del iframe
        document.title = title; // Actualizamos el título de la pestaña
        console.log(`Retroceso/avance a: ${url}, Título: ${title}`);
      }
    });
  });
  