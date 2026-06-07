const http = require('http');
const apiKey = "953f27ca082c420ab6d131814260706"; 
const location = "Boryspil";
const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Weather data:", data);
    const weatherInfo = document.createElement("div");
    weatherInfo.innerHTML = `
      <h1>Weather for ${data.location.name}, ${data.location.country}</h1>
      <p>Temperature: ${data.current.temp_c} °C</p>
      <p>Condition: ${data.current.condition.text}</p>
    `;
    document.body.prepend(weatherInfo);
  })
  .catch((error) => {
    console.error("Error fetching weather:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Could not load weather data. Check the API key and network connection.";
    document.body.prepend(errorMessage);
  });
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Weather App</title>
        </head>
        <body>
          <h1>Weather App</h1>
          <p>Loading weather data...</p>
        </body>
      </html>
    `);
  });
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });