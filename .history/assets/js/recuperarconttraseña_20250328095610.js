document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado');

    // Seleccionar el botón correcto
    const button = document.getElementById('sendButton');
    console.log(button); // Verifica que el botón exista

    if (button) {
        button.addEventListener('click', function() {
            // Seleccionar el mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            console.log(successMessage); // Verifica que el mensaje exista

            if (successMessage) {
                // Mostrar el mensaje
                successMessage.classList.remove('d-none');
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            } else {
                console.error('El mensaje de éxito no se encontró en el DOM.');
            }
        });
    } else {
        console.error('El botón no se encontró en el DOM.');
    }
});

