function imprimirFormularioParto() {
    // Obtener valores del formulario
    document.getElementById('printFechaParto').innerText = document.getElementById('fechaParto').value;
    document.getElementById('printIdCerda').innerText = document.getElementById('idCerda').value;
    document.getElementById('printPesoCerda').innerText = document.getElementById('pesoCerda').value;
    document.getElementById('printJaulaCerda').innerText = document.getElementById('jaulaCerda').value;
    document.getElementById('printLechonesVivos').innerText = document.getElementById('lechonesVivos').value;
    document.getElementById('printLechonesMuertos').innerText = document.getElementById('lechonesMuertos').value;
    document.getElementById('printPesoLechonesVivos').innerText = document.getElementById('pesoLechonesVivos').value;
    document.getElementById('printCondicionesSalud').innerText = document.getElementById('condicionesSalud').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableParto').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent; // Reemplazar contenido
    window.print(); // Activar impresión
  
    // Restaurar el contenido original
    document.body.innerHTML = originalContent;
  }
  