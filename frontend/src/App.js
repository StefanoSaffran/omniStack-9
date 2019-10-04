import React from 'react';
import './App.css';

import logo from './assets/logo.svg'
import Routes from './routes'

const App = () => {
  return (

    <div className="container">
      <img src={logo} alt="logo Aircnc" />
      <div className="content">
        <Routes />
        
      </div>
    </div>
  );
}

export default App;
