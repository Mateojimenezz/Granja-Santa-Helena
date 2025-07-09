function imprimirFormularioSalud() {
    // Capturar valores del formulario
    document.getElementById('printFechaSeguimiento').innerText = document.getElementById('fechaSeguimiento').value;
    document.getElementById('printIdAnimal').innerText = document.getElementById('idAnimal').value;
    document.getElementById('printPesoAnimal').innerText = document.getElementById('pesoAnimal').value;
    document.getElementById('printJaulaAnimal').innerText = document.getElementById('jaulaAnimal').value;
    document.getElementById('printSignosVitales').innerText = document.getElementById('signosVitales').value;
    document.getElementById('printDiagnostico').innerText = document.getElementById('diagnostico').value;
    document.getElementById('printTratamiento').innerText = document.getElementById('tratamiento').value;
    document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
    // Mostrar solo la sección de impresión
    const printableContent = document.getElementById('printableSalud').innerHTML;
    const originalContent = document.body.innerHTML;
  
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
  