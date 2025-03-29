document.getElementById('sendButton').addEventListener('click', function() {
    console.log('Botón presionado');
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');
    console.log('Mensaje mostrado');
});

