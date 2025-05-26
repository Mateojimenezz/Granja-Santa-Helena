function () {
    console.time("ImpresiónLechones");
  
    setTimeout(() => {
      document.getElementById('printFechaControl').innerText = document.getElementById('fechaControl').value;
      document.getElementById('printIdLechon').innerText = document.getElementById('idLechon').value;
      document.getElementById('printPesoLechon').innerText = document.getElementById('pesoLechon').value;
      document.getElementById('printJaulaLechon').innerText = document.getElementById('jaulaLechon').value;
      document.getElementById('printEstadoSalud').innerText = document.getElementById('estadoSalud').value;
      document.getElementById('printVacunas').innerText = document.getElementById('vacunas').value;
      document.getElementById('printObservaciones').innerText = document.getElementById('observaciones').value;
  
      const printableContent = document.getElementById('printableLechones').innerHTML;
      const originalContent = document.body.innerHTML;
  
      document.body.innerHTML = printableContent;
      window.print();
      document.body.innerHTML = originalContent;
  
      console.timeEnd("ImpresiónLechones");
    }, 100);
  }
  