// ✅ Mostrar vista previa de imagen antes de guardarla
document.getElementById("imagen")?.addEventListener("change", function(event) {
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

// ✅ Guardar nueva granja y redirigir a `seleccionarGranja.html`
document.getElementById("form-granja")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreGranja = document.getElementById("nombre").value;
    const urlImagen = document.getElementById("preview").src;

    if (nombreGranja && urlImagen) {
        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
        localStorage.setItem("granjas", JSON.stringify(granjas));

        alert("Granja agregada correctamente!");

        window.location.href = "seleccionarGranja.html"; // Redirigir
    }
});

    // 🌟 Mover el botón `+` al final de la última tarjeta agregada
    listaGranjas.appendChild(botonContainer);

________________________________________________________________________

