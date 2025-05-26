document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tabla-consumo");
    const agregarSemanaBtn = document.getElementById("agregarSemana");

    let semanas = JSON.parse(localStorage.getItem("semanas")) || [];

    function actualizarTabla() {
        tabla.innerHTML = ""; // Limpiar tabla antes de actualizar

        semanas.forEach((data, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>Semana ${data.semana}</td>
                <td>${data.edadInicial}-${data.edadFinal}</td>
                <td>${(data.consumoTotal / 7).toFixed(2)} kg</td>
                <td>${data.consumoTotal} kg</td>
                <td>${Math.round(data.consumoTotal / 14 * 1000)} g</td>
                <td>${Math.round(data.consumoTotal / 14 * 1000)} g</td>
                <td>${data.pesoInicial} kg</td>
                <td>${data.pesoFinal} kg</td>
            `;
            tabla.appendChild(fila);
        });
    }

    agregarSemanaBtn.addEventListener("click", function () {
        const nuevaSemana = {
            semana: semanas.length + 1,
            edadInicial: 21 + (semanas.length * 7),
            edadFinal: 28 + (semanas.length * 7),
            consumoTotal: Math.random() * (3 - 0.5) + 0.5, // Simulación de consumo
            pesoInicial: Math.round(Math.random() * (30 - 5) + 5),
            pesoFinal: Math.round(Math.random() * (35 - 10) + 10)
        };

        semanas.push(nuevaSemana);
        localStorage.setItem("semanas", JSON.stringify(semanas));
        actualizarTabla();
    });

    actualizarTabla(); // Cargar datos iniciales
});
