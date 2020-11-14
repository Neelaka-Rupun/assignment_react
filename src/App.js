import React from 'react';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import Home from './components/HomeComponent';
// import axios from './axios/axios';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    </div>
  );
}

export default App;
