async function checkWeather(city) {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    const locationName = `${data.location.name}, ${data.location.country}`;

    document.getElementById('location-name').innerText = locationName;
    document.getElementById('temp-value').innerText = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById('condition-text').innerText = data.current.condition.text;
    document.getElementById('humidity').innerText = `${data.current.humidity}%`;
    document.getElementById('wind-speed').innerText = `${data.current.wind_kph} км/год`;
    
    const icon = document.getElementById('weather-icon');
    icon.src = `https:${data.current.condition.icon}`;
    icon.style.display = "inline-block";
}

document.getElementById('search-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('city-input').value;
    if (inputVal.trim() !== '') {
        checkWeather(inputVal);
    }
});

checkWeather('Бориспіль'); 
