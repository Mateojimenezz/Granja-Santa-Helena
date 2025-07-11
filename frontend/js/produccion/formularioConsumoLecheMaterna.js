function imprimirFormularioLeche() {
    // Capturar valores del formulario
    document.getElementById('printFechaConsumo').innerText = document.getElementById('fechaConsumo').value;
    document.getElementById('printIdAnimal').innerText = document.getElementById('idAnimal').value;
    document.getElementById('printPesoAnimal').innerText = document.getElementById('pesoAnimal').value;
    document.getElementById('printJaulaAnimal').innerText = document.getElementById('jaulaAnimal').value;
    document.getElementById('printIdMadre').innerText = document.getElementById('idMadre').value;
    document.getElementById('printCantidadLeche').innerText = document.getElementById('cantidadLeche').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableLeche').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  