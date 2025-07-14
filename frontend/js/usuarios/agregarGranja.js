document.addEventListener("DOMContentLoaded", function () {
     const form = document.getElementById("form-granja");
     const inputImagen = document.getElementById("imagen");
     const preview = document.getElementById("preview");

     if (!form) {
          console.error("No se encontró el formulario.");
          return;
     }

     // Vista previa de la imagen
     inputImagen.addEventListener("change", function (event) {
          const file = event.target.files[0];

          if (!file) {
               preview.style.display = "none";
               return;
          }

          const reader = new FileReader();
          reader.onload = function () {
               preview.src = reader.result;
               preview.style.display = "block";
          };
          reader.readAsDataURL(file);
     });

     // Envío del formulario
     form.addEventListener("submit", async function (event) {
          event.preventDefault();

          const formData = new FormData(form);

          try {
               const response = await fetch("http://localhost:3000/api/usuarios/granjas", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
               });

               const result = await response.json();

               if (response.ok) {
                    console.log("✅ Granja agregada, redirigiendo...");

                    Swal.fire({
                         icon: 'success',
                         title: 'Granja agregada correctamente',
                         showConfirmButton: false,
                         timer: 2000
                    });

                    setTimeout(() => {
                         window.location.href = "seleccionarGranja.html";
                    }, 2100);

               } else {
                    Swal.fire({
                         icon: 'error',
                         title: 'Error al guardar',
                         text: result.message || "Error desconocido"
                    });
                    console.error("❌ Error al guardar la granja:", result);
               }

          } catch (error) {
               console.error("❌ Error al conectar con el servidor:", error);
               Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: "No se pudo conectar con el servidor."
               });
          }
     });
});
