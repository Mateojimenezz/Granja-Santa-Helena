// Asegúrate de que todo se cargue correctamente después del DOM.
document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.getElementById("toggleMenu");
    const sidebar = document.getElementById("sidebar");

    // Alterna la visibilidad del menú lateral al hacer clic en el botón.
    toggleMenu.addEventListener("click", function () {
        if (sidebar.style.display === "none" || sidebar.style.display === "") {
            sidebar.style.display = "block"; // Muestra el menú
        } else {
            sidebar.style.display = "none"; // Oculta el menú
        }
    });
});

  