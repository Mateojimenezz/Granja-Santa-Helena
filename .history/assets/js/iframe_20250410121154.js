document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const iframeContent = document.getElementById("iframe-content");
  
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        const page = this.getAttribute("data-page");
        fetch(page)
          .then(response => {
            if (!response.ok) throw new Error("Error al cargar la página");
            iframeContent.src = Ges ; // Carga la página en el iframe si está disponible
          })
          .catch(error => {
            console.error("No se pudo cargar la página:", error);
            iframeContent.src = "./error.html"; // Página de error
          });
      });
    });
  });
  
  
  
  