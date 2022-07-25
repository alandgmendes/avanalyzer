import logo from './logo.svg';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Intraday from './Components/IntraDay/IntraDay';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">        
        <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
      <Plot
        data={[{
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie'
        }]}
        layout = {{
          height: 240,
          width: 320
        }}
      />
      <Intraday ticker={"arara"}/>
      </header>
    </div>
  );
}

export default App;
