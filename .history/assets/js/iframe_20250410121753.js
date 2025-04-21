document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".nav-link");
    const iframeContent = document.getElementById("iframe-content");
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        const page = this.getAttribute("data-page"); // Obtén la ruta de la página asociada
        fetch(page)
          .then(response => {
            if (!response.ok) throw new Error("Error al cargar la página");
            iframeContent.src = page; // Usa el valor dinámico de 'page'
          })
          .catch(error => {
            console.error("No se pudo cargar la página:", error);
            iframeContent.src = "./error.html"; // Página de error
          });
      });
    });
  });
  
  
  
  