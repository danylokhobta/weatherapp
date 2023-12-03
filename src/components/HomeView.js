import React, { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './HomeView.sass';
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';

const HomeView = ({ cityForecasts, activeForecast, setActiveForecast }) => {
  const [swiper, setSwiper] = useState(null);

  const CustomNavigation = useCallback(() => {
    return (
      <div className='custom-navigation'>
        <div className="custom-button prev" onClick={() => swiper && swiper.slidePrev()}></div>
        <div className='location'>{activeForecast !== 'auto:ip' ? activeForecast : 'Current Location'}</div>
        <div className="custom-button next" onClick={() => swiper && swiper.slideNext()}></div>
      </div>
    );
  }, [swiper, activeForecast]);

  const handleSlideChange = useCallback(() => {
    if (swiper) {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const slideName = currentSlide.dataset.slideName;
      setActiveForecast(slideName);
    }
  }, [swiper, setActiveForecast]);

  return (
    <div className='HomeView'>
      <Swiper
        spaceBetween={100}
        allowTouchMove={false}
        loop={true}
        navigation={false}
        effect={'fade'}
        fadeEffect={{crossFade: true}}
        modules={[Navigation, EffectFade]}
        className="location-slider"
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={handleSlideChange}
      >
        {Object.entries(cityForecasts).map(([cityName, cityForecast]) => (
          <SwiperSlide className='SwiperSlide' key={cityName} data-slide-name={cityName}>
            <CurrentWeather hourlyForecast={cityForecast} />
            <DailyWeather hourlyForecast={cityForecast} />
          </SwiperSlide>
        ))}
      </Swiper>
      <CustomNavigation />
    </div>
  );
};

export default HomeView;
