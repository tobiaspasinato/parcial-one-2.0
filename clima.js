class Clima {
    city;
    temperature;
    wind;
    description;
    forecast;

    constructor(city, temperature, wind, description, forecast) {
        this.city = city;
        this.temperature = temperature;
        this.wind = wind;
        this.description = description;
        this.forecast = forecast.map(f => new Pronostico(f.day, f.temperature, f.wind));
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static fromJsonString(json){
        const obj = JSON.parse(json);
        return new Clima(
            obj.city,
            obj.temperature,
            obj.wind,
            obj.description,
            obj.forecast
        );
    }

    static guardar(encodedJsonString) {
        const jsonString = decodeURIComponent(encodedJsonString);
        const clima = Clima.fromJsonString(jsonString);
        let listaClima = JSON.parse(localStorage.getItem('climas')) || [];
        listaClima.push(clima);
        localStorage.setItem('climas', JSON.stringify(listaClima));
    }

    createHtmlElement(){
        const div = document.createElement('div');
        div.classList.add('clima-card');
        div.classList.add('clima');
        div.innerHTML = `
            <h1>${this.city}</h1>
            <p>Temperatura: ${this.temperature}</p>
            <p>Estado del clima: ${this.wind}</p>
            <p>Descripción: ${this.description}</p>
            <img src="${this.description === 'Sunny' ? '/sunny.png' : '/cloudy.png'}" alt="${this.description}">
            <button>Guardar</button>
        `;
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('pronosticos');
        this.forecast.forEach(f => {
            forecastDiv.appendChild(f.createHtmlElement());
        });
        div.appendChild(forecastDiv);

        const guardarButton = div.querySelector('button');
        guardarButton.addEventListener('click', () => {
            Clima.guardar(encodeURIComponent(this.toJsonString()));
        });

        return div;
    }
}