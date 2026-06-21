
const apiKey = '953f27ca082c420ab6d131814260706';

let city = document.getElementById('city-input').value.trim() || 'Boryspil';

let forecastData = [];
let locationName = '';

async function checkWeather() {
    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
        );

        const data = await response.json();

        if (data.error) {
            document.getElementById('location-name').innerText = 'API Error';
            document.getElementById('condition-text').innerText = data.error.message;
            return;
        }

        forecastData = data.forecast.forecastday;
        locationName = `${data.location.name}, ${data.location.country}`;

        createForecastButtons();
        showDay(0);

    } catch (error) {

        console.error('Weather request failed:', error);

        document.getElementById('location-name').innerText = 'Connection Error';
        document.getElementById('condition-text').innerText =
            'Unable to fetch weather data';
    }
}

function createForecastButtons() {

    const bar = document.getElementById('forecast-bar');

    if (!bar) return;

    bar.innerHTML = '';

    forecastData.forEach((day, index) => {

        const button = document.createElement('button');

        button.classList.add('day-btn');

        if (index === 0) {
            button.innerText = 'Today';
            button.classList.add('active');
        } else {
            button.innerText = `+${index} Day`;
        }

        button.addEventListener('click', () => {

            document.querySelectorAll('.day-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            showDay(index);
        });

        bar.appendChild(button);
    });
}

function showDay(index) {

    const day = forecastData[index];

    document.getElementById('location-name').innerText = locationName;

    document.getElementById('temp-value').innerText =
        `${Math.round(day.day.avgtemp_c)}°C`;

    document.getElementById('condition-text').innerText =
        day.day.condition.text;

    document.getElementById('humidity').innerText =
        `${day.day.avghumidity}%`;

    document.getElementById('wind-speed').innerText =
        `${day.day.maxwind_kph} km/h`;

    const icon = document.getElementById('weather-icon');

    icon.src = `https:${day.day.condition.icon}`;
    icon.style.display = 'inline-block';

    changeBackground(day.day.condition.text);
}

document.getElementById('search-btn').addEventListener('click', () => {

    const inputVal = document.getElementById('city-input').value.trim();

    if (inputVal) {
        city = inputVal;
        checkWeather();
    }
});

document.getElementById('city-input').addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        const inputVal = e.target.value.trim();

        if (inputVal) {
            city = inputVal;
            checkWeather();
        }

        e.target.value = '';
    }
});

function changeBackground(condition) {

    const body = document.body;
    const weather = condition.toLowerCase().trim();

    body.className = "";

    if (weather.includes("sunny") || weather.includes("clear")) {
        body.classList.add("sunny");
    }
    else if (
        weather.includes("cloud") ||
        weather.includes("overcast") ||
        weather.includes("mist")
    ) {
        body.classList.add("cloudy");
    }
    else if (
        weather.includes("rain") ||
        weather.includes("drizzle") ||
        weather.includes("patchy rain")
    ) {
        body.classList.add("rainy");
    }
    else if (
        weather.includes("snow") ||
        weather.includes("blizzard")
    ) {
        body.classList.add("snowy");
    }
}

checkWeather();