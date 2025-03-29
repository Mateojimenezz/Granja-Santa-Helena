document.getElementById('sendButton').addEventListener('click', function() {
    const successMessage = document.getElementById('successMessage');
    
    // Muestra el mensaje
    successMessage.classList.remove('d-none');
    
    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.classList.add('d-none');
    }, 5000); // Tiempo en milisegundos
});

