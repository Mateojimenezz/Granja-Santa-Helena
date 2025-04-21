document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link'); // Captura los enlaces del menú
    const iframe = document.getElementById(''); // Captura el iframe

    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Detenemos el comportamiento predeterminado del enlace

        const targetUrl = this.getAttribute('href'); // Obtenemos la URL de destino
        const pageTitle = this.getAttribute('data-title'); // Obtenemos el título de la página

        iframe.src = targetUrl; // Cambiamos el contenido del iframe
        document.title = pageTitle; // Cambiamos el título de la pestaña del navegador
        history.pushState({ url: targetUrl, title: pageTitle }, pageTitle, targetUrl); // Actualizamos la barra de URL
      });
    });

    // Manejar el evento de retroceso/avance
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        iframe.src = event.state.url; // Carga la URL guardada en el historial
        document.title = event.state.title; // Actualiza el título de la página
      }
    });
  });