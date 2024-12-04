async function traerDatos(nombreCity, id) {
    const caracteresNoPermitidos = /[@&$]/;
    const numerosNoPermitidos = /[0-9]/;
    const divError = document.getElementById("mensajeError");
    divError.innerHTML = "";
    const divUltimo = document.getElementById("ultimoLocalStorage");
    divUltimo.innerHTML = "";
    if(nombreCity.length < 3){
        divError.innerHTML = "El nombre de la ciudad debe tener al menos 3 caracteres";
    } else if (nombreCity.length > 12){
        divError.innerHTML = "El nombre de la ciudad no puede tener más de 12 caracteres";
    } else if (caracteresNoPermitidos.test(nombreCity)){
        let caracter = nombreCity.match(caracteresNoPermitidos);
        divError.innerHTML = "El nombre de la ciudad no puede contener caracteres especiales: " + caracter;
    } else if (numerosNoPermitidos.test(nombreCity)){
        divError.innerHTML = "El nombre de la ciudad no puede contener números";
    } else {
        try {
            const peticion = await fetch("https://weather-api-progra-3.vercel.app/weather/" + nombreCity);
            const data = await peticion.json();
            const clima = new Clima(data.city, data.temperature, data.wind, data.description, data.forecast);

            const ultimoLocalStorage = JSON.parse(localStorage.getItem('ultimoClimaBuscado'));

            if (ultimoLocalStorage) {
                const diferenciaTemperatura = parseFloat(clima.temperature) - parseFloat(ultimoLocalStorage.temperature);
                let resultado;
                if (clima.description === ultimoLocalStorage.description) {
                    resultado = "Igual";
                } else if (clima.description === "Sunny" && ultimoLocalStorage.description !== "Sunny") {
                    resultado = "Mas soleado";
                } else if (clima.description === "Rainy" && ultimoLocalStorage.description !== "Rainy") {
                    resultado = "Mas lluvioso";
                } else {
                    resultado = "Diferente";
                }
                divUltimo.innerHTML = `
                    <h1>Ultimo Clima: ${ultimoLocalStorage.city}</h1>
                    <p>Diferencia de temperatura: ${diferenciaTemperatura}</p>
                    <p>El clima esta: ${resultado}</p>
                `;
            }   

            localStorage.setItem('ultimoClimaBuscado', JSON.stringify(data));
            
            const climaDiv = document.getElementById(id);
            climaDiv.innerHTML = "";
            climaDiv.appendChild(clima.createHtmlElement());
        } catch (error) {
            console.log(error);
        }
    }
}

function descargarPDF() {
    const ticket = document.querySelector('#clima');

    html2canvas(ticket, {
        scale: 2, // Aumenta la calidad
        scrollX: 0, // Evita que el desplazamiento horizontal afecte la captura
        scrollY: -window.scrollY, // Evita el desplazamiento vertical en la captura
        useCORS: true // Evita problemas de recursos externos (CSS o imágenes)
    }).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');

        // Mantiene la relación de aspecto del ticket para no cortar el contenido
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Agrega la imagen en páginas sucesivas
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Descarga el archivo PDF
        doc.save('clima_avellaneda.pdf');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    traerDatos("avellaneda", "clima");
    
    const inputButton = document.getElementById("buscar");
    const inputCity = document.getElementById("traer-ciudad");
    const inputPDF = document.getElementById("PDF");
    inputButton.addEventListener("click", () => {
        if (inputCity.value) {
            traerDatos(inputCity.value, "busqueda");
        }
    });
    inputCity.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && inputCity.value) {
            traerDatos(inputCity.value, "busqueda");
        }
    });
});