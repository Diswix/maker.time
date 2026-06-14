const apiKey = '953f27ca082c420ab6d131814260706';
let city = document.getElementById('city-input').value.trim() || 'Boryspil';
async function checkWeather(city) {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        const data = await response.json();
        console.log(data.current.condition.text);

        if (data.error) {
            document.getElementById('location-name').innerText = 'API Error';
            document.getElementById('condition-text').innerText = data.error.message;
            return;
        }

        document.getElementById('location-name').innerText =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById('temp-value').innerText =
            `${Math.round(data.current.temp_c)}°C`;

        document.getElementById('condition-text').innerText =
            data.current.condition.text;

        document.getElementById('humidity').innerText =
            `${data.current.humidity}%`;

        document.getElementById('wind-speed').innerText =
            `${data.current.wind_kph} km/h`;

        const icon = document.getElementById('weather-icon');
        icon.src = `https:${data.current.condition.icon}`;
        icon.style.display = 'inline-block';

    } catch (error) {
        console.error('Weather request failed:', error);

        document.getElementById('location-name').innerText = 'Connection Error';
        document.getElementById('condition-text').innerText =
            'Unable to fetch weather data';
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();

    if (city) {
        checkWeather(city);
    }
});

document.getElementById('city-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = e.target.value.trim();

        if (city) {
            checkWeather(city);
        }
        e.target.value = ''; 
    }
});

function changeBackground(condition) {
    const body = document.body;
    const weather = condition.toLowerCase();

    if (weather.includes("clear")) {
        body.style.background = "linear-gradient(#fceabb, #f8b500)";
    } 
    else if (weather.includes("cloud")) {
        body.style.background = "linear-gradient(#bdc3c7, #2c3e50)";
    } 
    else if (weather.includes("rain")) {
        body.style.background = "linear-gradient(#4e54c8, #8f94fb)";
    } 
    else if (weather.includes("snow")) {
        body.style.background = "linear-gradient(#e6dada, #274046)";
    } 
    else {
        body.style.background = "#222";
    }
}

checkWeather('Boryspil');

