document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado');
    const button = document.getElementById('sendButton');
    console.log(button); // Debería mostrar el elemento botón en la consola
    if (button) {
        button.addEventListener('click', function() {
            const successMessage = document.getElementById('successMessage');
            console.log(successMessage); // Verifica que exista el mensaje
            successMessage.classList.remove('d-none');
            setTimeout(() => {
                successMessage.classList.add('alert');
            }, 5000);
        });
    } else {
        console.error('El botón no existe en el DOM');
    }
});
