document.getElementById("menuToggle").addEventListener("click", function () {
    const logo = document.getElementById("logo");
    const menu = document.getElementById("menu");
  
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block"; // Muestra el menú
      logo.style.display = "none"; // Oculta el logo
    } else {
      menu.style.display = "none"; // Oculta el menú
      logo.style.display = "block"; // Muestra el logo
    }
    console.log("El script está funcionando");

  });
  