import { createContext, useState } from 'react';

const ForecastManagerContext = createContext();

const ForecastManagerProvider = ({ children }) => {
  const [activeForecast, setActiveForecastAfter] = useState(null);

  const setActiveForecast = (value) => setActiveForecastAfter(value);

  return (
    <ForecastManagerContext.Provider value={{ activeForecast, setActiveForecast }}>
      {children}
    </ForecastManagerContext.Provider>
  );
};

export {ForecastManagerContext, ForecastManagerProvider};