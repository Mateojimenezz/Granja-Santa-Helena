
  document.getElementById('photoInput').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Obtenemos el archivo seleccionado
    if (file) {
      const reader = new FileReader();

      // Cargamos el archivo y actualizamos la imagen
      reader.onload = function (e) {
        document.getElementById('profilePhoto').src = e.target.result; // Mostramos la imagen cargada
      };

      reader.readAsDataURL(file); // Leemos el archivo como DataURL
    }

