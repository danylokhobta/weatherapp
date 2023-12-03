import React, { useState, useEffect } from 'react';

const WeatherIconManager = ({ forecast, iconFolder = 'weather_icons' }) => {
  const weatherCode = forecast.declaredCode;
  const [iconUrl, setIconUrl] = useState(null);

  const currentHour = new Date().getHours();
  let timeOfDay = '';
  if (weatherCode === 'clear' || weatherCode === 'partly_cloudy') {
    timeOfDay = currentHour >= 6 && currentHour < 18 ? 'day/' : 'night/';
  }

  useEffect(() => {
    if (weatherCode !== null) {
      async function importIcon() {
        try {
          const iconModule = await import(`../media/${iconFolder}/${timeOfDay}${weatherCode}.svg`);
          setIconUrl(iconModule.default);
        } catch (error) {
          console.error(`Failed to load image for weather code ${weatherCode}:`, error);
        }
      }

      importIcon();
    }
  }, [timeOfDay, weatherCode, iconFolder]);

  return (
    <div className='WeatherIconManager'>
      <img
        src={iconUrl}
        alt={`Icon: ${iconUrl}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />
    </div>
    
  );
};

export default WeatherIconManager;