function imprimirFormularioLechones() {
    let ventanaImpresion = window.open('', '', 'width=800,height=600');
    ventanaImpresion.document.write(`
      <h2>Control de Lechones Lactantes</h2>
      <p><strong>Fecha:</strong> ${document.getElementById('fechaControl').value}</p>
      <p><strong>ID:</strong> ${document.getElementById('idLechon').value}</p>
      <p><strong>Peso:</strong> ${document.getElementById('pesoLechon').value}</p>
      <p><strong>Jaula N°:</strong> ${document.getElementById('jaulaLechon').value}</p>
      <p><strong>Estado de Salud:</strong> ${document.getElementById('estadoSalud').value}</p>
      <p><strong>Vacunas Administradas:</strong> ${document.getElementById('vacunas').value}</p>
      <p><strong>Observaciones:</strong> ${document.getElementById('observaciones').value}</p>
    `);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
  }
  