function verMas(id) {
  const url = `?id=${id}`;
  console.log('Redirigiendo a:', url);
  window.location.href = url;
}






// Función para abrir el formulario de nueva cerda
function abrirFormulario() {
  window.location.href = './fomularioRegHembrasPreñadas.html';
}