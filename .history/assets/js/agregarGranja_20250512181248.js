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
    
        // 🌟 Verificar tamaño del archivo (máx. 2MB recomendado)
        if (file.size > 2 * 1024 * 1024) {
            alert("La imagen es demasiado grande. Usa una menor a 2MB.");
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
    document.getElementById("form-granja")?.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const nombreGranja = document.getElementById("nombre").value;
        const urlImagen = document.getElementById("preview").src;
    
        if (!nombreGranja || !urlImagen || urlImagen === "") {
            alert("Por favor, ingresa el nombre y sube una imagen válida.");
            return;
        }
    
        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
    
        try {
            localStorage.setItem("granjas", JSON.stringify(granjas));
            console.log("Granja guardada correctamente.");
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al guardar la granja. Intenta con una imagen más ligera.");
            return;
        }
    
        alert("Granja agregada correctamente!");
        window.location.href = "seleccionarGranja.html"; // 🌟 Redirección garantizada
    });
    

    

