import { useContext } from 'react';
import { ForecastManagerContext } from '../contexts/ForecastManagerContext';

const useActiveForecast = () => {
  const { activeForecast, setActiveForecast } = useContext(ForecastManagerContext);

  return { activeForecast, setActiveForecast };
};

export default useActiveForecast;
