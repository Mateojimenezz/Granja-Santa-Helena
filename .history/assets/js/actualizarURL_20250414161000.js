document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Capturamos los enlaces del menú
    const iframe = document.getElementById('iframe-content'); // Referencia al iframe
  
    if (!iframe) {
      console.error("El iframe con id 'iframe-content' no se encontró en el DOM.");
      return;
    }
  
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitamos que el enlace recargue la página
  
        const targetUrl = this.getAttribute('href'); // Obtenemos la URL de destino
        const pageTitle = this.getAttribute('data-title'); // Obtenemos el título de la página
  
        if (!targetUrl || !pageTitle) {
          console.error("El enlace no tiene un href o data-title válido.");
          return;
        }
  
        iframe.src = targetUrl; // Cambiamos el contenido del iframe
        history.pushState({ url: targetUrl, title: pageTitle }, pageTitle, targetUrl);
        document.title = pageTitle; // Cambiamos el título de la pestaña
      });
    });
  
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        const { url, title } = event.state;
        iframe.src = url; // Cambiamos el contenido del iframe
        document.title = title; // Actualizamos el título de la pestaña
      }
    });
  });
  