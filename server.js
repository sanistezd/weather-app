require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ==================== CONFIGURATION ====================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================

// Home page
app.get('/', (req, res) => {
  console.log('📍 Homepage accessed');
  res.render('index', {
    title: 'Weather App',
    error: null,
    weather: null
  });
});

// Weather search
app.post('/weather', async (req, res) => {
  try {
    const { city } = req.body;
    
    // Validation
    if (!city || city.trim() === '') {
      return res.render('index', {
        title: 'Weather App',
        error: 'Please enter a city name',
        weather: null
      });
    }

    console.log(`🔍 Searching weather for: ${city}`);
    
    // API call
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`;
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Process data
    const weather = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      windSpeed: weatherData.wind.speed,
      visibility: (weatherData.visibility / 1000).toFixed(1),
      willRain: weatherData.weather[0].main === 'Rain',
    };

    console.log(`✅ Weather found: ${weather.temperature}°C in ${weather.city}`);

    // Render result
    res.render('weather', {
      title: `Weather in ${weather.city}`,
      weather: weather,
      error: null
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    let errorMessage = 'An error occurred while fetching weather data';
    
    if (error.response?.status === 404) {
      errorMessage = 'City not found. Please check the spelling.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid API key. Please check your configuration.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'No internet connection. Please check your network.';
    }

    res.render('index', {
      title: 'Weather App',
      error: errorMessage,
      weather: null
    });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.send('✅ Server is working!');
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🌤️  WEATHER APP STARTED SUCCESSFULLY');
  console.log('='.repeat(50));
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${API_KEY ? '✅ Loaded' : '❌ Missing'}`);
  if (API_KEY) {
    console.log(`📡 Key starts with: ${API_KEY.substring(0, 8)}...`);
  }
  console.log('='.repeat(50));
});