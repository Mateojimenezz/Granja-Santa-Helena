document.addEventListener('DOMContentLoaded', function () {
    const iframe = document.getElementById('iframe-content');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        const pageTitle = this.getAttribute('data-title');
        iframe.src = targetUrl;
        history.pushState({}, pageTitle, targetUrl);
        document.title = pageTitle;
      });
    });

    window.addEventListener('popstate', function () {
      iframe.src = window.location.pathname;
    });
  });
  
  
  