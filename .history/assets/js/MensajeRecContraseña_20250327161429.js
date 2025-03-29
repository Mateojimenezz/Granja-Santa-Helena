document.getElementById('sendButton').addEventListener('click', function() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');
    
    // Opción: Puedes ocultar el mensaje después de unos segundos
    setTimeout(() => {
      successMessage.classList.add('d-none');
    }, 5000); // 5 segundos
  });
  