import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Button} from 'reactstrap';
import {TimelinePlot} from './DataTimeline/TimelinePlot'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          
        </p>
      </header>
      <div className="Plot-Display">
        <TimelinePlot/>
      </div>

      <div className="External-UI">
        <Button className="Button">Import Data</Button>
      </div>

      <footer className="App-footer">
        <p>Application powered by <code>React</code></p>
      </footer>
    </div>
  );
}

export default App;
