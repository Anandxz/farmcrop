import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun, CloudRain } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

export function WeatherForecast() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWeather({
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: "Partly Cloudy",
        forecast: [
          { day: "Tomorrow", temp: 27, condition: "Sunny" },
          { day: "Wednesday", temp: 29, condition: "Cloudy" },
          { day: "Thursday", temp: 26, condition: "Rain" },
          { day: "Friday", temp: 28, condition: "Partly Cloudy" },
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Weather Forecast</h2>
      
      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{weather.temperature}°C</p>
            <p className="text-lg">{weather.condition}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-2" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-4 gap-4">
          {weather.forecast.map((day, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
            >
              <p className="text-gray-600 mb-2">{day.day}</p>
              {getWeatherIcon(day.condition)}
              <p className="text-lg font-semibold mt-2">{day.temp}°C</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Farming Tip</h3>
        <p className="text-gray-700">
          Based on the forecast, tomorrow morning would be ideal for spraying pesticides due to low wind conditions and no expected rainfall.
        </p>
      </div>
    </div>
  );
}