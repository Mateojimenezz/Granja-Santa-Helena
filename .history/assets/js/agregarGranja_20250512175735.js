document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-granja");

    if (!form) {
        console.error("No se encontró el formulario.");
        return;
    }

    document.getElementById("imagen")?.addEventListener("change", function(event) {
        const file = event.target.files[0]; 
    
        if (!file) {
            alert("No se ha seleccionado ninguna imagen.");
            return;
        }
    
        // 🌟 Verificar si el tipo de archivo es válido
        const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];
        if (!tiposPermitidos.includes(file.type)) {
            alert("Formato de imagen no permitido. Usa JPG o PNG.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById("preview").src = reader.result;
            document.getElementById("preview").style.display = "block";
        };
    
        reader.readAsDataURL(file);
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


