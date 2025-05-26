function imprimirFormularioResultado() {
    // Capturar valores del formulario
    document.getElementById('printFechaServicio').innerText = document.getElementById('fechaServicio').value;
    document.getElementById('printIdAnimal').innerText = document.getElementById('idAnimal').value;
    document.getElementById('printPesoAnimal').innerText = document.getElementById('pesoAnimal').value;
    document.getElementById('printJaulaAnimal').innerText = document.getElementById('jaulaAnimal').value;
    document.getElementById('printResultadoServicio').innerText = document.getElementById('resultadoServicio').value;
    document.getElementById('printNumCrias').innerText = document.getElementById('numCrias').value;
    document.getElementById('printFechaParto').innerText = document.getElementById('fechaParto').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableResultado').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  