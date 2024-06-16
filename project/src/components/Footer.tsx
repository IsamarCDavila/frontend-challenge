import React from 'react';
import './Footer.scss';
import logo from '../images/Logo-white.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} className="Footer-logo" alt="Rimac Logo" />
      </div>
      <div className="footer-text">
        © 2023 RIMAC Seguros y Reaseguros.
      </div>
    </footer>
  );
};

export default Footer;
