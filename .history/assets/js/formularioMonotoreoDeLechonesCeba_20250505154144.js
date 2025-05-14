function imprimirFormularioMonitoreo() {
    // Capturar valores del formulario
    document.getElementById('printIdLechon').innerText = document.getElementById('idLechon').value;
    document.getElementById('printPesoLechon').innerText = document.getElementById('pesoLechon').value;
    document.getElementById('printJaulaLechon').innerText = document.getElementById('jaulaLechon').value;
    document.getElementById('printFechaInicioCeba').innerText = document.getElementById('fechaInicioCeba').value;
    document.getElementById('printFechaPesaje').innerText = document.getElementById('fechaPesaje').value;
    document.getElementById('printVacunasAplicadas').innerText = document.getElementById('vacunasAplicadas').value;
    document.getElementById('printEstadoSalud').innerText = document.getElementById('estadoSalud').value;
    document.getElementById('printRegistroTratamientos').innerText = document.getElementById('registroTratamientos').value;
    document.getElementById('printConsumoAlimento').innerText = document.getElementById('consumoAlimento').value;
    document.getElementById('printConsumoAgua').innerText = document.getElementById('consumoAgua').value;
    document.getElementById('printCondicionesAmbientales').innerText = document.getElementById('condicionesAmbientales').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Transferir la imagen al área de impresión
    document.getElementById('printCerdaPhoto').src = document.getElementById('cerdaPhoto').src;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableMonitoreo').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  
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