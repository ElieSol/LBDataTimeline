import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Button} from 'reactstrap';
import {ChartPanel} from './ChartPanel/ChartPanel';
import {TimelinePlot} from './ChartPanel/TimelinePlot';

const AppDisplay: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Timeline View
        </p>
      </header>
      <div></div>

      

      <footer className="App-footer">
        <p>Application powered by <code>React</code></p>
      </footer>
    </div>
  );
}

export default AppDisplay;
