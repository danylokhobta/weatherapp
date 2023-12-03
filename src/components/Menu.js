// Menu.js
import React, { useState, useEffect } from 'react';
import './Menu.sass';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const liElements = document.querySelectorAll('.Menu .menu-content ul li');
    const isAnimatingDuration = 0.32 * 1000;

    liElements.forEach((li, index) => {
      li.style.transitionDelay = `${index * 0.1}s`;
    });

    isAnimating && setTimeout(() => setIsAnimating(false), isAnimatingDuration);
  }, [isAnimating]);

  return (
    <div className={`Menu ${isOpen ? 'open' : ''}`}>
      <button className='menu-button' onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </button>
      <div className='menu-content'>
        <ul>
          <MenuItem label="Coder's portfolio" url="http://portfolio.tlprc.com/" />
          <MenuItem label="Designer's Figma page" url="https://www.figma.com/@ageraui" />
          <MenuItem label="Weather API" url="https://www.weatherapi.com/" />
          <MenuItem label="Country Codes API" url="https://restcountries.com/" />
        </ul>
      </div>
    </div>
  );
};

const MenuItem = ({ label, url }) => (
  <li>
    <a href={url} target='_blank' rel='noopener noreferrer'>{label}</a>
  </li>
);

export default Menu;
