import React, { useState } from 'react';
import axios from 'axios';
import './weatherApp.css';

const API_KEY = 'MFy4JHUzOGXgreMgYdJybvJbBXNaPsfq';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  
  const [error, setError] = useState(null);

  

  const handleLocationSubmit = async () => {
  
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
      
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
        />
        <button className="button" onClick={handleLocationSubmit}>Search</button>
      </div>
      
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weatherContainer">
          <h2 className="subtitle">{weatherData.location.name}</h2>
          <p className="temperature">Temperature: {weatherData.data.values.temperature}°C</p>
          <p className="humidity">Humidity: {weatherData.data.values.humidity}%</p>
          <p className="windSpeed">Wind Speed: {weatherData.data.values.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
