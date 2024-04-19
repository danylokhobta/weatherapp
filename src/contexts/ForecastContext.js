import { createContext, useState, useEffect } from 'react';
import weatherCodeLibrary from '../assets/weatherCodeLibrary.json';

const ForecastContext = createContext();

const ForecastProvider = ({ children }) => {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const locations = ['auto:ip', 'Kyiv', 'Bielefeld'];
  const API_KEY = 'd0334dce1627484b908113957230111';

  useEffect(() => {
    const fetchWeatherData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    };

    const getDecodedWeatherCode = async (code) => {
      for (const key in weatherCodeLibrary) {
        if (weatherCodeLibrary[key].includes(code)) {
          return key;
        }
      }
      return 'unknown'; // Default to 'unknown' if no match is found
    };

    const fetchData = async () => {
      try {
        const allForecasts = {};

        // Loop through locations and fetch forecasts for each location
        for (const location of locations) {
          const forecastApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=2&aqi=no&alerts=no`;
          const data = await fetchWeatherData(forecastApiUrl);
          const currentHour = new Date().getHours();

          const todayForecast = data.forecast.forecastday[0].hour.slice(currentHour, 24);
          const tomorrowForecast = data.forecast.forecastday[1].hour.slice(0, currentHour + 1);
          const combinedForecast = [...todayForecast, ...tomorrowForecast];

          if (combinedForecast && combinedForecast.length > 0) {
            const updatedCombinedForecast = await Promise.all(
              combinedForecast.map(async (hour) => ({
                ...hour,
                declaredCode: hour.condition ? await getDecodedWeatherCode(hour.condition.code) : 'unknown',
              }))
            );

            const locationName = data.location.name;
            const codeApiUrl = `https://restcountries.com/v3.1/name/${data.location.country}`;
            const locationCode = await fetchWeatherData(codeApiUrl).then((data) => data[0]?.altSpellings?.[0]);

            const updatedCombinedData = {
              location: { name: locationName, code: locationCode || 'unknown' },
              forecast: updatedCombinedForecast,
            };

            allForecasts[location] = updatedCombinedData;
          }
        }

        // Pass the object with all forecasts to the parent component
        setForecasts(allForecasts);
        console.log(allForecasts);
        setLoading(false);
      } catch (error) {
        setError(error.message)
      }
    };

    fetchData();
  }, []);

  const value = { forecasts, loading, error };

  return (
    forecasts && <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};

export {ForecastContext, ForecastProvider};