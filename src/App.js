import './App.sass';
import HomeView from './components/HomeView';
import Menu from './components/Menu';
import useForecast from './hooks/useForcast';
import useActiveForecast from './hooks/useActiveForecast';

function App() {
  const {forecasts} = useForecast();
  const {activeForecast} = useActiveForecast();

  const currentHour = new Date().getHours();

  return (
    <div className={`App 
      ${activeForecast && forecasts[activeForecast].forecast[0].declaredCode}
      ${currentHour >= 6 && currentHour < 18 ? '' : 'night' }
    `}>
      <HomeView/>
      <Menu />
    </div>
  );
}

export default App;
