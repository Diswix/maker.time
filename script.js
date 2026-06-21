const apiKey = '953f27ca082c420ab6d131814260706';
let city = document.getElementById('city-input').value.trim() || 'Boryspil';
let globalForecastData = null;
let globalLocationText = '';

async function checkWeather() {
    try {
        const response = await fetch(
            `https://weatherapi.com{apiKey}&q=${city}&days=7&aqi=no`
        );

        const data = await response.json();

        if (data.error) {
            document.getElementById('location-name').innerText = 'API Error';
            document.getElementById('condition-text').innerText = data.error.message;
            return;
        }

        globalForecastData = data.forecast.forecastday;
        globalLocationText = `${data.location.name}, ${data.location.country}`;

        createForecastButtons(globalForecastData);
        showDayData(0);

    } catch (error) {
        console.error('Weather request failed:', error);

        document.getElementById('location-name').innerText = 'Connection Error';
        document.getElementById('condition-text').innerText = 'Unable to fetch weather data';
        document.getElementById('weather-icon').style.display = 'none';
        document.getElementById('temp-value').innerText = '--°C';
        document.getElementById('humidity').innerText = '--%';
        document.getElementById('wind-speed').innerText = '-- km/h';
        document.getElementById('forecast-bar').innerHTML = '';
    }
}

function createForecastButtons(forecastDays) {
    const bar = document.getElementById('forecast-bar');
    bar.innerHTML = '';

    forecastDays.forEach((day, index) => {
        const btn = document.createElement('button');
        btn.classList.add('day-btn');
        if (index === 0) btn.classList.add('active');

        const dateObj = new Date(day.date);
        const dayName = index === 0 ? 'Сьогодні' : dateObj.toLocaleDateString('uk-UA', { weekday: 'short' });

        btn.innerText = dayName;
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            showDayData(index);
        });

        bar.appendChild(btn);
    });
}

function showDayData(index) {
    if (!globalForecastData || !globalForecastData[index]) return;

    const targetDay = globalForecastData[index];
    document.getElementById('location-name').innerText = globalLocationText;

    document.getElementById('temp-value').innerText = `${Math.round(targetDay.day.avgtemp_c)}°C`;
    document.getElementById('condition-text').innerText = targetDay.day.condition.text;
    document.getElementById('humidity').innerText = `${targetDay.day.avghumidity}%`;
    document.getElementById('wind-speed').innerText = `${targetDay.day.maxwind_kph} km/h`;

    const icon = document.getElementById('weather-icon');
    icon.src = `https:${targetDay.day.condition.icon}`;
    icon.style.display = 'inline-block';

    changeBackground(targetDay.day.condition.text);
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
    else if (weather.includes("cloud") || weather.includes("overcast") || weather.includes("mist")) {
        body.classList.add("cloudy");
    } 
    else if (weather.includes("rain") || weather.includes("drizzle") || weather.includes("patchy rain")) {
        body.classList.add("rainy");
    } 
    else if (weather.includes("snow") || weather.includes("blizzard")) {
        body.classList.add("snowy");
    }
}

checkWeather();
