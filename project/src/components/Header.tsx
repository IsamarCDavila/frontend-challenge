import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../logo.svg';
import logorimac from '../images/logo-rimac.svg'
import './Header.scss';

const Header: React.FC = () => {
  const location = useLocation();
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    if (location.pathname === '/planes') {
      setIsDarkBackground(true); // cambiar color a transparente cuando est'a en el home y en las demas vistas s'olo blanco
    } else {
      setIsDarkBackground(false);
    }
  }, [location.pathname]);

  return (
    <header className={`header ${isDarkBackground ? 'dark' : 'light'}`}>
      <div className="header-logo">
        <img src={logorimac} className="Rimac-logo" alt="Rimac Logo" />
      </div>
      <div className="header-contact">
        <span>¡Compra por este medio!</span>
        <a href="tel:(01) 411 6001"> <i className="fa-solid fa-phone"></i> (01) 411 6001</a>
      </div>
    </header>
  );
};

export default Header;
