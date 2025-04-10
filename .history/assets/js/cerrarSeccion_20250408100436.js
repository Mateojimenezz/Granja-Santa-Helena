document.getElementById("logoutButton").addEventListener("click", function () {
    // Aquí puedes agregar tu lógica para cerrar sesión
    alert("Cerrando sesión...");
    window.location.href = "/login.html"; // Redirige al usuario a la página de inicio de sesión

}
sidebar.style.position = "fixed";
sidebar.style.zIndex = "9999"; // Garantiza que esté sobre otros elementos
sidebar.style.top = "0";
sidebar.style.height = "100%";

const logoutButton = document.querySelector(".logout-button");
logoutButton.style.zIndex = "1"; // Asegura que el botón quede debajo

  });
  