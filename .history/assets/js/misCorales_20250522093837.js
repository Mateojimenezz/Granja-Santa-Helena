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

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("corrales-container");

    let semanas = JSON.parse(localStorage.getItem("semanas")) || [];

    // 🔥 Generar tarjetas dinámicamente
    semanas.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "card");

        card.innerHTML = `
            <h5>Semana ${data.semana}</h5>
            <p>
                <span class="num-negro">${data.total}</span> |
                <span class="num-rojo">${data.enfermos}</span> |
                <span class="num-verde">${data.nuevos}</span>
            </p>
            <p class="lotes-activos">Lotes Activos: ${data.lotes}</p>
        `;

        container.appendChild(card);
    });
});

