import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.sass';
import App from './App';
import {ForecastProvider} from './contexts/ForecastContext';
import { ForecastManagerProvider } from './contexts/ForecastManagerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ForecastProvider>
      <ForecastManagerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ForecastManagerProvider>
    </ForecastProvider>
  </React.StrictMode>
);
