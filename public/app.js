const map = L.map('map').setView([20, 0], 2);

// Initialize the map with OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to update the map with a marker for the specified location
function updateMap(lat, lon, city) {
  map.setView([lat, lon], 10);
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  L.marker([lat, lon]).addTo(map)
    .bindPopup(`<b>${city}</b>`)
    .openPopup();
}

// Function to display weather data
function displayWeatherData(weatherData, forecastData, exchangeRateData) {
  const weatherResults = document.getElementById('weatherResults');
  
  weatherResults.innerHTML = '';

  const entry = document.createElement('div');
  entry.className = 'weather-entry';
  
  entry.innerHTML = `
    <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
    <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
    <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
    <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
    <p><strong>Forecast:</strong> ${forecastData.description}</p>
    <p><strong>Currancy USD/KZT:</strong> ${exchangeRateData.conversion_rate}</p>
  `;
  
  weatherResults.appendChild(entry);
}


// Function to fetch current weather data
async function fetchCurrentWeather(city) {
  const response = await fetch(`/weather?city=${city}`);
  return response.json();
}

// Function to fetch weather forecast data
async function fetchWeatherForecast(city) {
  const response = await fetch(`/weather-forecast?city=${city}`);
  return response.json();
}

// Function to fetch Currency Exchange data
async function fetchCurrencyExchange() {
  const response = await fetch(`/currency`);
  return response.json();
}

// Event listener for the button click
document.getElementById('getWeatherButton').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();
  
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  
  try {
    const currentWeatherData = await fetchCurrentWeather(city);
    const forecastData = await fetchWeatherForecast(city);
    const exchangeRateData = await fetchCurrencyExchange();
    if (currentWeatherData && forecastData && exchangeRateData) {
      displayWeatherData(currentWeatherData, forecastData, exchangeRateData);
      
      
      const lat = currentWeatherData.coord.lat;
      const lon = currentWeatherData.coord.lon;
      updateMap(lat, lon, currentWeatherData.name);

      document.getElementById('cityInput').value = '';
    } else {
      alert('Error fetching current weather data');
    }
  } catch (error) {
    alert('An error occurred while fetching the weather data');
    console.error('Error:', error);
  }
});
