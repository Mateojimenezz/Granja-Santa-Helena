//funcion para imprimir los datos del formulario de seguimiento de gestacion de forma ordenada
function imprimirFormularioGestacion() {
    // Transferir valores del formulario a la sección de impresión
    document.getElementById('printFechaControl').innerText = document.getElementById('fechaControl').value;
    document.getElementById('printIdCerda').innerText = document.getElementById('idCerda').value;
    document.getElementById('printPesoCerda').innerText = document.getElementById('pesoCerda').value;
    document.getElementById('printJaulaCerda').innerText = document.getElementById('jaulaCerda').value;
    document.getElementById('printResultadoExamen').innerText = document.getElementById('resultadoExamen').value;
    document.getElementById('printEvaluacionNutricional').innerText = document.getElementById('evaluacionNutricional').value;
    document.getElementById('printResultadoUltrasonido').innerText = document.getElementById('resultadoUltrasonido').value;
    document.getElementById('printRegistroTratamientos').innerText = document.getElementById('registroTratamientos').value;
    document.getElementById('printMonitoreoSaludReproductiva').innerText = document.getElementById('monitoreoSaludReproductiva').value;
    document.getElementById('printCondicionesAmbientales').innerText = document.getElementById('condicionesAmbientales').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableGestacion').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent; // Reemplazar el contenido
    window.print(); // Activar la impresión
  
    // Restaurar la página original
    document.body.innerHTML = originalContent;
  }
  //------------------------------------------------------------
  