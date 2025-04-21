document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.-link'); // Seleccionamos los enlaces del menú
    const iframe = document.getElementById('iframe-content'); // Identificamos el iframe donde se cargan las páginas

    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitamos el comportamiento predeterminado del enlace

        const targetUrl = this.getAttribute('href'); // Obtenemos el destino del enlace
        const pageName = this.getAttribute('data-page'); // Obtenemos el nombre de la página para fines descriptivos

        iframe.src = targetUrl; // Cambiamos la URL del iframe
        history.pushState({ page: pageName }, '', targetUrl); // Actualizamos la URL del navegador
      });
    });

    // Gestionar el retroceso/avance en el navegador
    window.addEventListener('popstate', function (event) {
      if (event.state) {
        iframe.src = event.state.page + '.html'; // Actualizamos el contenido del iframe según el historial
      }
    });
  });