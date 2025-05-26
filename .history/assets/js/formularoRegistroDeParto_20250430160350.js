function imprimirFormularioParto() {
    // Obtener los valores del formulario
    const fechaParto = document.getElementById('fechaParto').value;
    const idCerda = document.getElementById('idCerda').value;
    const pesoCerda = document.getElementById('pesoCerda').value;
    const jaulaCerda = document.getElementById('jaulaCerda').value;
    const lechonesVivos = document.getElementById('lechonesVivos').value;
    const lechonesMuertos = document.getElementById('lechonesMuertos').value;
    const pesoLechonesVivos = document.getElementById('pesoLechonesVivos').value;
    const condicionesSalud = document.getElementById('condicionesSalud').value;
    const observaciones = document.getElementById('observaciones').value;
  
    // Crear la ventana para impresión
    const ventanaImpresion = window.open('', '', 'width=800,height=600');
    ventanaImpresion.document.write(`
      <h2 clas>Registro de Parto</h2>
      <br>
      <p><strong>Fecha del Parto:</strong> ${fechaParto}</p>
      <p><strong>ID:</strong> ${idCerda}</p>
      <p><strong>Peso:</strong> ${pesoCerda}</p>
      <p><strong>Jaula N°:</strong> ${jaulaCerda}</p>
      <p><strong>Número de Lechones Nacidos Vivos:</strong> ${lechonesVivos}</p>
      <p><strong>Número de Lechones Nacidos Muertos:</strong> ${lechonesMuertos}</p>
      <p><strong>Peso de los Lechones Vivos:</strong> ${pesoLechonesVivos}</p>
      <p><strong>Condiciones de Salud:</strong> ${condicionesSalud}</p>
      <p><strong>Observaciones:</strong> ${observaciones}</p>
    `);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
  }
  