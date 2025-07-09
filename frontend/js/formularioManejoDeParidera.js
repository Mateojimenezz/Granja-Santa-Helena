function imprimirFormularioParidera() {
    // Capturar valores del formulario
    document.getElementById('printFechaIngreso').innerText = document.getElementById('fechaIngreso').value;
    document.getElementById('printIdCerda').innerText = document.getElementById('idCerda').value;
    document.getElementById('printPesoCerda').innerText = document.getElementById('pesoCerda').value;
    document.getElementById('printJaulaCerda').innerText = document.getElementById('jaulaCerda').value;
    document.getElementById('printHorarioAlimentacion').innerText = document.getElementById('horarioAlimentacion').value;
    document.getElementById('printCondicionesAmbientales').innerText = document.getElementById('condicionesAmbientales').value;
    document.getElementById('printRegistroLimpieza').innerText = document.getElementById('registroLimpieza').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableParidera').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent; // Reemplazar contenido
    window.print(); // Activar impresión
  
    // Restaurar el contenido original
    document.body.innerHTML = originalContent;
  }
  