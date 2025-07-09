/* aqui se sincroniza el usuario en el menu laterar */
// Información del usuario
const userInfo = {
    name: "Juan Pérez", // Aquí colocarás dinámicamente el nombre desde tu base de datos
    photo: "ruta-a-la-foto-del-usuario.jpg" // Aquí colocarás la ruta de la foto del usuario
  };
  
  // Función para renderizar la información del usuario
  function displayUserInfo() {
    const userPhoto = document.querySelector(".user-photo");
    const userName = document.querySelector(".user-name");
  
    // Actualizar los elementos con la información del usuario
    userPhoto.src = userInfo.photo;
    userName.textContent = userInfo.name;
  }
  
  // Llama a la función al cargar la página
  displayUserInfo();
  