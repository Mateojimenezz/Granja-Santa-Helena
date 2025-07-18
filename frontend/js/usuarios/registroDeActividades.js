//frontend/js/usuarios/registroDeActividades.js
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const filterDate = document.getElementById('filterDate');
  const filterUser = document.getElementById('filterUser');
  const filterActivity = document.getElementById('filterActivity');
  const tableBody = document.getElementById('tableBody');
  const noResults = document.getElementById('noResults');
  let actividades = [];

  // Primero validamos permisos antes de cargar absolutamente todo
  fetch('http://localhost:3000/api/usuarios/actividades', {
    credentials: 'include'
  })
    .then(async res => {
      const main = document.querySelector('div.container');
      if (!res.ok) {
        if (res.status === 403) {
          main.innerHTML = `
            <div class="alert alert-danger text-center">
              <h4 class="alert-heading">Acceso denegado</h4>
              <p>No tienes permisos para ver esta sección.</p>
            </div>`;
        } else {
          main.innerHTML = `
            <div class="alert alert-warning text-center">
              <h4 class="alert-heading">Error inesperado</h4>
              <p>No se pudieron cargar las actividades.</p>
            </div>`;
          console.error('Error al cargar actividades:', res.statusText);
        }
        const btn = document.getElementById('generateReportButton');
        if (btn) btn.style.display = 'none';
        return;
      }

      const data = await res.json();
      actividades = data;
      llenarFiltros(data);
      renderizarTabla(data);
      configurarEventos();
    })
    .catch(err => {
      const main = document.querySelector('div.container');
      main.innerHTML = `
        <div class="alert alert-warning text-center">
          <h4 class="alert-heading">Error inesperado</h4>
          <p>No se pudieron cargar las actividades.</p>
        </div>`;
      console.error('Error al cargar actividades:', err);
    });

  // Llena los filtros
  function llenarFiltros(data) {
    const usuarios = new Set();
    const acciones = new Set();

    // Agrega "Todos"
    const defaultUserOption = document.createElement('option');
    defaultUserOption.textContent = "Todos los usuarios";
    defaultUserOption.value = "";
    filterUser.appendChild(defaultUserOption);

    const defaultActivityOption = document.createElement('option');
    defaultActivityOption.textContent = "Todas las actividades";
    defaultActivityOption.value = "";
    filterActivity.appendChild(defaultActivityOption);

    data.forEach(item => {
      usuarios.add(item.usuario);
      acciones.add(item.actividad);
    });

    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.textContent = usuario;
      filterUser.appendChild(option);
    });

    acciones.forEach(accion => {
      const option = document.createElement('option');
      option.textContent = accion;
      filterActivity.appendChild(option);
    });
  }

  // Renderiza tabla
  function renderizarTabla(data) {
    tableBody.innerHTML = '';
    let visibleRows = 0;

    const selectedDate = filterDate.value;
    const selectedUser = filterUser.value;
    const selectedActivity = filterActivity.value;

    data.forEach(item => {
      const matchesDate = selectedDate ? item.fecha.includes(selectedDate) : true;
      const matchesUser = selectedUser ? item.usuario === selectedUser : true;
      const matchesActivity = selectedActivity ? item.actividad === selectedActivity : true;


      // ✅ Mostrar todos si no se ha seleccionado nada
      if (matchesDate && matchesUser && matchesActivity) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${formatearFecha(item.fecha)}</td>
        <td>${item.usuario}</td>
        <td>${item.actividad}</td>
      `;
        tableBody.appendChild(row);
        visibleRows++;
      }
    });

    noResults.style.display = visibleRows === 0 ? 'block' : 'none';
  }


  // Solo configuramos filtros y botón PDF si tiene permiso
  function configurarEventos() {
    filterDate.addEventListener('change', () => renderizarTabla(actividades));
    filterUser.addEventListener('change', () => renderizarTabla(actividades));
    filterActivity.addEventListener('change', () => renderizarTabla(actividades));

    document.getElementById('generateReportButton').addEventListener('click', function () {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.autoTable({
        html: '#activityTableContent',
        startY: 10,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 20 },
      });

      doc.save('registro_actividades.pdf');
    });
  }
});
