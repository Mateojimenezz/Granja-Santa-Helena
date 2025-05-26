document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-granja");

    if (!form) {
        console.error("No se encontró el formulario.");
        return;
    }

    // ✅ Evento para mostrar la vista previa de la imagen antes de guardarla
    document.getElementById("imagen").addEventListener("change", function(event) {
        const file = event.target.files[0]; 
        const reader = new FileReader();

        reader.onload = function() {
            document.getElementById("preview").src = reader.result;
            document.getElementById("preview").style.display = "block";
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // ✅ Evento para agregar la granja y redirigir a `seleccionarGranja.html`
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombreGranja = document.getElementById("nombre").value;
        const urlImagen = document.getElementById("preview").src;

        if (!nombreGranja || !urlImagen) {
            alert("Por favor, ingresa el nombre y sube una imagen.");
            return;
        }

        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
        localStorage.setItem("granjas", JSON.stringify(granjas));

        alert("Granja agregada correctamente!");

        // 🌟 Aseguramos que la redirección se haga correctamente
        window.location.assign("seleccionarGranja.html");  
    });
});


