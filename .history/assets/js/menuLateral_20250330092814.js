.
document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.getElementById("toggleMenu");
    const sidebar = document.getElementById("sidebar");

    toggleMenu.addEventListener("click", function () {
        if (sidebar.style.display === "none" || sidebar.style.display === "") {
            sidebar.style.display = "block"; // Muestra el menú
        } else {
            sidebar.style.display = "none"; // Oculta el menú
        }
    });
});

  