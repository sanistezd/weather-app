# Weather App 

A simple and beautiful weather application built with Express.js, Node.js, and the OpenWeatherMap API. Check if it will rain in any city around the world!

## Features

- Real-time weather data for any city
- Beautiful, responsive UI
- Rain forecast information
- Detailed weather metrics (temperature, humidity, wind speed, etc.)
- Error handling for invalid cities and API issues

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-app
Install dependencies

bash
npm install
Set up environment variables

Create a .env file in the root directory

Add your OpenWeatherMap API key:

text
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
Get your API key

Sign up at OpenWeatherMap

Get your free API key from the dashboard

Add it to the .env file

Run the application

bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
Open your browser
Navigate to http://localhost:3000