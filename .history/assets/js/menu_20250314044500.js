document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const logo = document.getElementById("logo");
    const menu = document.getElementById("menu");
  
    menuToggle.addEventListener("click", function () {
      if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        logo.style.display = "none";
      } else {
        menu.style.display = "none";
        logo.style.display = "block";
      }
    });
  });
  
  