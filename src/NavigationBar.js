import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

function NavigationBar() {
  return (
    <div className="nav-container">
      <Link to="/">
        <button className="home-button">
          <img src="/home.png" alt="Home" />
        </button>
      </Link>
    </div>
  );
}

export default NavigationBar;
