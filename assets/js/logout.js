document.querySelectorAll(".cerrar-sesion").forEach(button => {
  button.addEventListener("click", () => {
    // Elimina el indicador de usuario logueado
    localStorage.removeItem("usuarioLogueado");
    // Redirige a la página de login
    window.location.href = "login.html";  // Ajusta la ruta si tu archivo login está en otro lugar
  });
});
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("usuarioLogueado")) {
    window.location.href = "login.html";
  }
});
