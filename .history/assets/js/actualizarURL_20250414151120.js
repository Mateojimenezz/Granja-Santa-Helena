document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Capturamos los enlaces
    const iframe = document.getElementById('iframe-content'); // Capturamos el iframe

    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Detenemos el comportamiento predeterminado del enlace

        const targetUrl = this.getAttribute('href'); // Obtenemos el enlace de destino
        const pageTitle = this.getAttribute('data-page-title'); // Título de la página

        iframe.src = targetUrl; // Cambiamos el contenido del iframe
        history.pushState({ page: targetUrl }, pageTitle, targetUrl); // Actualizamos la URL del navegador y el título
        document.title = pageTitle; // Actualizamos el título de la pestaña
      });
    });

    // Manejo del historial (retroceso/avance del navegador)
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        iframe.src = event.state.page; // Cargamos la página correspondiente en el iframe
      }
    });
  });