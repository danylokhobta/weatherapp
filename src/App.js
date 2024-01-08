import React, { useState } from 'react';
import './App.sass';
import HomeView from './components/HomeView';
import ForecastFetcher from './components/ForecastFetcher';
import Menu from './components/Menu';

function App() {
  const [cityForecasts, setCityForecasts] = useState(null);
  const [activeForecast, setActiveForecast] = useState(null);
  const locations = ['auto:ip', 'Kyiv', 'Bielefeld'];

  const currentHour = new Date().getHours();

  return (
    <div className={`App 
      ${activeForecast && cityForecasts[activeForecast].forecast[0].declaredCode}
      ${currentHour >= 6 && currentHour < 18 ? '' : 'night' }
    `}>
      <ForecastFetcher locations={locations} setCityForecasts={setCityForecasts} />
      {cityForecasts && <HomeView cityForecasts={cityForecasts} activeForecast={activeForecast} setActiveForecast={setActiveForecast} />}
      <Menu />
    </div>
  );
}

export default App;
