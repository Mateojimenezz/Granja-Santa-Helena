document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item"); // Ítems del menú
    const mainContent = document.querySelector("main"); // Contenedor principal donde se cargará el contenido
  
    menuItems.forEach((item, index) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        // Obtiene la página asociada al ítem
        const page = this.getAttribute("data-page");
  
        // Reemplaza el contenido de <main> con el contenido de la página seleccionada
        fetch(page)
          .then(response => {
            if (!response.ok) throw new Error(`Error al cargar la página: ${response.status}`);
            return response.text();
          })
          .then(html => {
            mainContent.innerHTML = html; // Reemplaza el contenido actual de <main>
          })
          .catch(error => {
            console.error("Error:", error);
            mainContent.innerHTML = `<p>Error al cargar la página. Inténtalo nuevamente.</p>`;
          });
      });
    });
  });
  
  