# Weather and Currency Exchange App

## Overview

This application allows users to get real-time weather data for a specified city and view currency exchange rates. The app utilizes multiple APIs to fetch current weather conditions, weather forecasts, and exchange rates.

## Features

- **Current Weather**: Retrieve current weather conditions by city name.
- **Weather Forecast**: Get weather forecast data for a specified city.
- **Currency Exchange**: Fetch exchange rates between USD and KZT.

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for building the API.
- **Node-Fetch**: For making HTTP requests to external APIs.
- **Axios**: Optional library for HTTP requests.
- **OpenWeather API**: To get current weather data.
- **Visual Crossing Weather API**: To fetch weather forecast data.
- **ExchangeRate-API**: For currency exchange rates.

## Installation

1. Clone the repository:
   git clone https://github.com/HolySxn/weatherapp.git
   cd weatherapp

2. Install dependencies:
   npm install

3. Add your API keys:
      weatherApiKey=your_openweather_api_key
      forecastApi=your_visualcrossing_api_key
      currencyApi=your_exchangerate_api_key

5. Start the server:
   node server.js

6. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **GET /weather**: Retrieve current weather data.
  - **Query Parameters**: 
    - `city`: Name of the city to fetch the weather for.
  
- **GET /weather-forecast**: Retrieve weather forecast data.
  - **Query Parameters**: 
    - `city`: Name of the city to fetch the weather forecast for.

- **GET /currency**: Retrieve currency exchange rates.
  - **Response**: Provides the exchange rate between USD and KZT.

## Usage

- Enter the city name in the input field and click the button to fetch the current weather, forecast and exchange rate between USD and KZT.
