//frontend/js/usuarios/editarPerfil.js
document.addEventListener('DOMContentLoaded', () => {
  // Obtener los datos del perfil del usuario actual
  fetch('http://localhost:3000/api/usuarios/perfil', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(usuario => {
      document.getElementById('profilePhoto').src = usuario.foto || '/default-avatar.png';
      document.getElementById('name').value = usuario.nombre || '';
      document.getElementById('id').value = usuario.identificacion || '';
      document.getElementById('email').value = usuario.email || '';
      document.getElementById('phone').value = usuario.telefono || '';
      document.getElementById('role').value = usuario.cargo || '';
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

  const nombre = document.getElementById('name').value;
  const telefono = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const foto = document.getElementById('profilePhoto').src;

  if (password && password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Solo enviamos lo que sí se puede actualizar
  const datos = {
    nombre,
    telefono,
    foto
  };

  if (password) datos.password = password;

  fetch('http://localhost:3000/api/usuarios/perfil', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al actualizar');
      return res.json();
    })
    .then(data => {
      alert('Perfil actualizado correctamente');
    })
    .catch(err => {
      console.error('Error al actualizar perfil:', err);
      alert('Hubo un error al actualizar tu perfil');
    });
});
