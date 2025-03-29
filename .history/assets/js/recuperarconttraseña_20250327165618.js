document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendButton').addEventListener('click', function() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('d-none');
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    });
});
