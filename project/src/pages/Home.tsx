import React from 'react';
import logo from '../logo.svg';
import Form from '../components/Form';
import Footer from '../components/Footer';
import heroImg from '../images/hero.svg';
import leftBlur from '../images/blur-asset-violet.svg';
import rightBlur from '../images/blur-asset-green.svg';


const Home: React.FC = () => {
  return (
    <div>
      <img src={leftBlur} className="Left-blur" alt="blur" />
      <img src={rightBlur} className="Right-blur" alt="blur" />
        <div className="Home">
            <div >
                <img src={heroImg} className="Hero-img" alt="Hero-img" />
            </div>
            <div className="form">
                <button className="tag"> Seguro Salud Flexible </button>
                <Form />
            </div>
        </div>
        <Footer />
    </div>
    
  );
};

export default Home;