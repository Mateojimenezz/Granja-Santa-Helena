document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.querySelector("main"); // Contenido principal
  const menuItems = document.querySelectorAll(".nav-item"); // Ítems principales del menú
  const sidebarMenu = document.getElementById("sisidebarMenu"); // Menú lateral

  // Función para alternar visibilidad de submenús
  function toggleSubmenu(item) {
    const submenu = item.querySelector(".submenu-cloned"); // Busca el submenú correspondiente
    if (submenu) {
      submenu.style.display = submenu.style.display === "block" ? "none" : "block"; // Alterna entre visible y oculto
    }
  }

  // Añadir evento de clic a los ítems principales del menú
  menuItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado
      toggleSubmenu(item); // Llama a la función para alternar el submenú
    });
  });
});



