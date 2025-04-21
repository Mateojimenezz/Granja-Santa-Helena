document.addEventListener("DOMContentLoaded", function () {
    const iframeContent = document.getElementById("iframe-content");
    const sidebar = document.getElementById("sidebar");
    const sidebarMenu = document.getElementById("sisidebarMenu"); // Contenedor del menú lateral
    const menuItems = document.querySelectorAll(".menu-item");
  
    // Verifica la existencia de elementos clave
    if (!iframeContent || !sidebar || !sidebarMenu || menuItems.length === 0) {
      console.error("Uno o más elementos necesarios no existen en el DOM.");
      return; // Detén la ejecución si falta algo
    }
  
    // Manejador para los ítems del menú
    menuItems.forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
  
        const page = this.getAttribute("data-page");
  
        if (page) {
          iframeContent.src = page; // Carga la página en el iframe
          console.log(`Cargando la página en el iframe: ${page}`);
  
          // Oculta el menú lateral si es una pantalla pequeña
          if (window.innerWidth < 768) {
            sidebar.style.display = "none";
          }
        } else {
          console.warn("El atributo 'data-page' no está definido en este ítem.");
        }
      });
    });
  
    // Ajusta el comportamiento del menú lateral para pantallas pequeñas
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        sidebar.style.display = "block"; // Muestra el menú lateral en pantallas grandes
      } else {
        sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
      }
    });
  
    // Inicializar el estado del menú lateral
    if (window.innerWidth < 768) {
      sidebar.style.display = "none"; // Oculta el menú lateral en pantallas pequeñas
    } else {
      sidebar.style.display = "block  
  
  
  
  
  
  