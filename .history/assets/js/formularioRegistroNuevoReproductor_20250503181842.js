function imprimirFormularioReproductor() {
    // Capturar valores del formulario
    document.getElementById('printFechaNacimiento').innerText = document.getElementById('fechaNacimiento').value;
    document.getElementById('printIdReproductor').innerText = document.getElementById('idReproductor').value;
    document.getElementById('printPesoReproductor').innerText = document.getElementById('pesoReproductor').value;
    document.getElementById('printJaulaReproductor').innerText = document.getElementById('jaulaReproductor').value;
    document.getElementById('printGeneroReproductor').innerText = document.getElementById('generoReproductor').value;
    document.getElementById('printRazaReproductor').innerText = document.getElementById('razaReproductor').value;
    document.getElementById('printFechaIngreso').innerText = document.getElementById('fechaIngreso').value;
    document.getElementById('printHistorialServicio').innerText = document.getElementById('historialServicio').value;
    document.getElementById('printObservacionesReproductor').innerText = document.getElementById('observacionesReproductor').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableReproductor').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  