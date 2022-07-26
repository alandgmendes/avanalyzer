import logo from './logo.svg';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Intraday from './Components/IntraDay/IntraDay';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Intraday ticker={"NU"}/>
      </header>
    </div>
  );
}

export default App;
