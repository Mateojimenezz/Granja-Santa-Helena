document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link');
    const iframe = document.getElementById('iframe-content');
  
    if (!iframe) {
      console.error("El iframe con id 'iframe-content' no se encontró en el DOM.");
      return;
    }
  
    // Escuchamos los clics de todos los enlaces
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        const targetUrl = this.getAttribute('href');
        const pageTitle = this.getAttribute('data-title');
  
        if (!targetUrl || !pageTitle) {
          console.error("El enlace no tiene un href o data-title válido.");
          return;
        }
  
        iframe.src = targetUrl; // Cambiamos el contenido del iframe
        history.pushState({ url: targetUrl, title: pageTitle }, pageTitle, targetUrl); // Actualizamos la barra de URL
        document.title = pageTitle; // Cambiamos el título de la página
        console.log(`Navegando a: ${targetUrl}, Título: ${pageTitle}`);
      });
    });
  
    // Retroceso/avance en el historial
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        iframe.src = event.state.url;
        document.title = event.state.title;
      }
    });
  });
  
  
  