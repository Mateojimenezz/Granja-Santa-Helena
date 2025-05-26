
//----------------------------------------------------------------------
  // Función para actualizar la foto de la cerda
function updatePhoto(event) {
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const photoElement = document.getElementById('cerdaPhoto');
      photoElement.src = e.target.result;
      
      // Añadir margin-top de -20px
      photoElement.style.marginTop = '-20px';
    };
    reader.readAsDataURL(file);
    }
    }