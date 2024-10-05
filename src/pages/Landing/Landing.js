import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="logo">QUYD</h1>
        <h2 className="subtitle">Questionnez vos documents</h2>
        <h3 className="product-name">Pour Demo</h3>
        <p className="company-name">By Hexamind</p>
        <p className="contact-info">Veuillez nous contacter à l'adresse : hello@hexamind.ai</p>
        <p className="instruction">Puis veuillez vous connecter pour continuer</p>
        <Link to="/login" className="connect-button">Se connecter</Link>
      </div>
    </div>
  );
};

export default Landing;