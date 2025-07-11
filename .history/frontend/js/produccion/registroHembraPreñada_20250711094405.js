// Función para obtener el valor del parámetro "id" de la URL
function verMas(id) {
  const url = `../produccion//SegumientoDeGestacion.html?id=${id}`;
  console.log('Redirigiendo a:', url);
  window.location.href = url;
}


// Función para abrir el formulario de nueva cerda
function abrirFormulario() {
  window.location.href = './fomularioRegHembrasPreñadas.html';
}