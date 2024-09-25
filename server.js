const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const { default: axios } = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Replace with your actual OpenWeather API key
const apiKey = 'a246adfad6eb2b9982af01d1934985c4';
const currencyApi = '9df4503037adddb3bc85fddd'

// Endpoint for current weather data
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({ message: 'Failed to fetch current weather data' });
  }
});

// Endpoint for forecast 
app.get('/weather-forecast', async (req, res) => {
  const { city } = req.query;

  try {
    // Replace with your actual weather history API call
    const forecastResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=DT3YS4BLUVZ9JDZUFJFRMQEW5`);
    
    if (!forecastResponse.ok) {
      throw new Error('Weather forecast not found');
    }

    const forecastData = await forecastResponse.json();
    res.json(forecastData);
  } catch (error) {
    console.error('Error fetching weather history:', error);
    res.status(500).json({ message: 'Failed to fetch weather history' });
  }
});

// Endpoint for excange 
app.get('/currency', async (req, res) => {
  const {base, target} = req.query;

  try {
    const exchangeResponse = await fetch(`https://v6.exchangerate-api.com/v6/${currencyApi}/pair/${base}/${target}`)

    if (!exchangeData.ok) {
      throw new Error('Exchange data not found');
    }

    const exchangeData = await exchangeResponse.json();
    res.json(exchangeData);
  } catch (error) {
    console.error('Error fetching exchange data:', error);
    res.status(500).json({ message: 'Failed to fetch exchange data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
