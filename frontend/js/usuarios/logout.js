document.querySelectorAll(".cerrar-sesion").forEach(button => {
  button.addEventListener("click", () => {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => {
        localStorage.clear(); // Limpia todo
        window.location.href = "login.html";
      })
      .catch(error => {
        console.error("Error cerrando sesión:", error);
        window.location.href = "login.html";
      });
  });
});
