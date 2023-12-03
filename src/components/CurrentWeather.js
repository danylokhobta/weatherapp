import './CurrentWeather.sass';
import WeatherIconManager from './WeatherIconManager';

const CurrentWeather = ( {hourlyForecast} ) => {
  return (
    <div className='CurrentWeather'>
      <div className='date'>
        <h4>Today</h4>
      </div>
      <div className='content'>
        <WeatherIconManager
          forecast={hourlyForecast.forecast[0]}
          iconFolder={'weather_background'}
        />
        <div className='temperature'>
          <h1>{Math.round(hourlyForecast.forecast[0].temp_c)}</h1>
          <span>°</span>
        </div>
        <div className="map-marker"></div>
        <h1 className='location'>{hourlyForecast.location.code}</h1>
      </div>
    </div>
  );
}

export default CurrentWeather;