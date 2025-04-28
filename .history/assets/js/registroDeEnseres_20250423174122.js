// Objeto con las categorías y sus tipos asociados
const categoriasYTipos = {
    alimentacion: [
      "Tolvas",
      "Bebederos automáticos",
      "Contenedores de alimentos"
    ],
    limpieza: [
      "Hidrolavadoras",
      "Escobas industriales",
      "Productos químicos",
      "Baldes y mangueras"
    ],
    cuidado: [
      "Jaulas de manejo",
      "Termómetros",
      "Kits de primeros auxilios",
      "Esquiladoras"
    ],
    mantenimiento: [
      "Martillos",
      "Alicates",
      "Destornilladores",
      "Materiales de reparación"
    ]
  };
  
  // Función para actualizar los tipos según la categoría seleccionada
  document.addEventListener('change', function (event) {
    if (event.target.classList.contains('categoria-select')) {
      const categoriaSeleccionada = event.target.value;
      const fila = event.target.closest('tr'); // Obtener la fila actual
      const tipoSelect = fila.querySelector('.tipo-select'); // Campo de Tipo
  
      // Limpiar las opciones del campo de Tipo
      tipoSelect.innerHTML = '<option selected disabled>Seleccionar Tipo</option>';
  
      // Añadir las opciones correspondientes a la categoría seleccionada
      if (categoriasYTipos[categoriaSeleccionada]) {
        categoriasYTipos[categoriaSeleccionada].forEach(tipo => {
          const option = document.createElement('option');
          option.value = tipo.toLowerCase(); // Valor en minúsculas
          option.textContent = tipo; // Texto mostrado
          tipoSelect.appendChild(option);
        });
      }
    }
  });
  