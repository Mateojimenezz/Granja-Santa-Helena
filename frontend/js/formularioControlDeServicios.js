function imprimirFormularioServicio() {
    // Capturar valores del formulario
    document.getElementById('printFechaServicio').innerText = document.getElementById('fechaServicio').value;
    document.getElementById('printIdAnimal').innerText = document.getElementById('idAnimal').value;
    document.getElementById('printPesoAnimal').innerText = document.getElementById('pesoAnimal').value;
    document.getElementById('printJaulaAnimal').innerText = document.getElementById('jaulaAnimal').value;
    document.getElementById('printTipoServicio').innerText = document.getElementById('tipoServicio').value;
    document.getElementById('printVeterinarioResponsable').innerText = document.getElementById('veterinarioResponsable').value;
    document.getElementById('printResultadoServicio').innerText = document.getElementById('resultadoServicio').value;
    document.getElementById('printFechaResultado').innerText = document.getElementById('fechaResultado').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableServicio').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  