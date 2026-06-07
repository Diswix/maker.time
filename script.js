async function checkWeather(city) {
    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('location-name').innerText = "Ошибка API";
            document.getElementById('condition-text').innerText = data.error.message;
            console.error("Ошибка от Weather API:", data.error.message);
            return;
        }

        const locationName = `${data.location.name}, ${data.location.country}`;

        document.getElementById('location-name').innerText = locationName;
        document.getElementById('temp-value').innerText = `${Math.round(data.current.temp_c)}°C`;
        document.getElementById('condition-text').innerText = data.current.condition.text;
        document.getElementById('humidity').innerText = `${data.current.humidity}%`;
        document.getElementById('wind-speed').innerText = `${data.current.wind_kph} км/год`;
        
        const icon = document.getElementById('weather-icon');
        icon.src = `https:${data.current.condition.icon}`;
        icon.style.display = "inline-block";
    } catch (error) {
        console.error("error:", error);
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('city-input').value;
    if (inputVal.trim() !== '') {
        checkWeather(inputVal);
    }
});

checkWeather('Boryspil');

