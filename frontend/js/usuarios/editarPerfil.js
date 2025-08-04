//frontend/js/usuarios/editarPerfil.js
let fotoOriginal = '';
let nombreOriginal = '';
let telefonoOriginal = '';
let cargoOriginal = '';
let permisoOriginal = '';

document.addEventListener('DOMContentLoaded', () => {
  // Obtener los datos del perfil del usuario actual
  fetch('http://localhost:3000/api/usuarios/perfil', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(usuario => {
      document.getElementById('profilePhoto').src = usuario.foto || '/default-avatar.png';
      fotoOriginal = usuario.foto || '';
      document.getElementById('name').value = usuario.nombre || '';
      nombreOriginal = usuario.nombre || '';
      document.getElementById('id').value = usuario.identificacion || '';
      document.getElementById('email').value = usuario.email || '';
      document.getElementById('phone').value = usuario.telefono || '';
      telefonoOriginal = usuario.telefono || '';
      document.getElementById('role').value = usuario.cargo || '';
      cargoOriginal = usuario.cargo || '';
      document.getElementById('permiso').value = usuario.permiso || '';
      permisoOriginal = usuario.permiso || '';
    })
    .catch(err => {
      console.error('Error al cargar perfil:', err);
      alert('No se pudo cargar tu perfil');
    });

  // Vista previa de la imagen seleccionada
  document.getElementById('photoInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      document.getElementById('profilePhoto').src = reader.result;
    };

    if (file) reader.readAsDataURL(file);
  });
});

// Enviar los datos actualizados
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('name').value.trim();
  const telefono = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const foto = document.getElementById('profilePhoto').src;
  const cargo = document.getElementById('role').value.trim();
  const permiso = document.getElementById('permiso').value.trim();

  // Validar contraseñas
  if (password && password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Validar campos requeridos
  if (!cargo) {
    alert('El campo "Cargo" es requerido');
    return;
  }
  if (!permiso) {
    alert('El campo "Permiso" es requerido');
    return;
  }

  // Detectar cambios
  const datos = {};
  if (nombre && nombre !== nombreOriginal) datos.nombre = nombre;
  if (telefono && telefono !== telefonoOriginal) datos.telefono = telefono;
  // Solo enviar foto si el usuario seleccionó una nueva imagen (base64 diferente a la original)
  if (foto && foto.startsWith('data:image/') && foto !== fotoOriginal) datos.foto = foto;
  if (password) datos.password = password;
  if (cargo !== cargoOriginal) datos.cargo = cargo;
  if (permiso !== permisoOriginal) datos.permiso = permiso;

  // Log para depuración
  console.log('Datos que se enviarán al backend:', datos);

  if (Object.keys(datos).length === 0) {
    alert('No hay cambios para actualizar');
    return;
  }

  fetch('http://localhost:3000/api/usuarios/perfil', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
    })
    .then(data => {
      alert('Perfil actualizado correctamente');
      // Actualizar los valores originales para futuras ediciones
      if (datos.nombre) nombreOriginal = datos.nombre;
      if (datos.telefono) telefonoOriginal = datos.telefono;
      if (datos.foto) fotoOriginal = datos.foto;
      if (datos.cargo) cargoOriginal = datos.cargo;
      if (datos.permiso) permisoOriginal = datos.permiso;
      // Limpiar campos de contraseña
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';
    })
    .catch(err => {
      console.error('Error al actualizar perfil:', err);
      alert(err.message || 'Hubo un error al actualizar tu perfil');
    });
});
