import { useContext } from 'react';
import { ForecastContext } from '../contexts/ForecastContext';

const useForecast = () => {
  const values = useContext(ForecastContext);

  return values;
};

export default useForecast;
