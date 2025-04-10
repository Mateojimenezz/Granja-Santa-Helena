/* aqui se maneja el submenu en la pantalla grande en el div lateral */
// Función para manejar los submenús en pantallas grandes
function handleSubmenusForLargeScreen() {
  menuItems.forEach(item => {
    const submenu = item.querySelector(".submenu");

    if (submenu) {
      submenu.classList.add("submenu-hidden"); // Oculta submenús en el header
    }
  });
}

// Función para restaurar la visibilidad de los submenús en pantallas pequeñas
function restoreSubmenusForSmallScreen() {
  menuItems.forEach(item => {
    const submenu = item.querySelector(".submenu");
    if (submenu) {
      submenu.classList.remove("submenu-hidden");
    }
  });
}

// Redimensionar: ajustar dinámicamente el comportamiento
window.addEventListener("resize", function () {
  if (isLargeScreen()) {
    handleSubmenusForLargeScreen(); // Oculta submenús en el header en pantallas grandes
    showAllMenuItems(); // Asegura que el menú lateral muestre los submenús
  } else {
    clearSidebarMenu(); // Limpia el menú lateral para pantallas pequeñas
    restoreSubmenusForSmallScreen(); // Restaura los submenús en el header
  }
});

// Lógica inicial al cargar la página
if (isLargeScreen()) {
  handleSubmenusForLargeScreen(); // Oculta submenús en el header
  showAllMenuItems(); // Muestra submenús en el menú lateral
} else {
  clearSidebarMenu(); // Limpia el menú lateral para pantallas pequeñas
  restoreSubmenusForSmallScreen(); // Restaura los submenús en el header
}

  