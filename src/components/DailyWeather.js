import React, { useState, useRef, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import './DailyWeather.sass';
import DailyWeatherIconManager from './WeatherIconManager';

function WeatherForecast({ hourlyForecast }) {
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef();

  const updateBounds = useCallback(() => {
    const containerWidth = containerRef.current.clientWidth;
    const contentWidth = containerRef.current.scrollWidth;
    const maxDragX = Math.max(0, contentWidth - containerWidth);
    setBounds({ left: -maxDragX, right: 0 });
  }, [containerRef]);

  useEffect(() => {
    updateBounds();

    const handleResize = () => {
      updateBounds();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBounds]);

  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  return (
    <div className="DailyWeather">
      <Draggable axis="x" bounds={bounds} nodeRef={containerRef} onDrag={(e, data) => setDragX(data.x)}>
        <div className="card-list" style={{ transform: `translateX(${dragX}px)` }} ref={containerRef}>
          {hourlyForecast.forecast.map((forecastData, index) => (
            <div className="hour-card" key={index}>
              <p>{new Date(forecastData.time).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</p>
              <DailyWeatherIconManager forecast={forecastData} />
              <p>{forecastData.chance_of_rain}%</p>
              <p>{Math.round(forecastData.temp_c)}°</p>
            </div>
          ))}
        </div>
      </Draggable>
    </div>
  );
}

export default WeatherForecast;
