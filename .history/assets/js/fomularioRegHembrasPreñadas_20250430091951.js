 


//----------------------------------------------------------------------
// Función para guardar los datos
document.getElementById('cerdaForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Crear un objeto FormData para enviar los datos
  const formData = new FormData(this);

  try {
    // Enviar los datos al backend
    const response = await fetch('http://localhost:3000/guardarCerda', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Cerda registrada correctamente');
      this.reset(); // Reinicia el formulario
    } else {
      alert('Error al guardar los datos');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un problema al guardar los datos.');
  }
});
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

//----------------------------------------------------------------------
//funcion para carar archivo

document.getElementById('registroTratamiento').addEventListener('change', function () {
    const archivo = this.files[0];
    if (archivo) {
      document.getElementById('archivoNombre').value = archivo.name;
    }
  });
  