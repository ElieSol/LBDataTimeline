import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {ChartPanel} from './ChartPanel/ChartPanel';
import {TimelinePlot} from './ChartPanel/TimelinePlot';
import classnames from 'classnames';

class ImportDisplay extends React.Component{
  render(){
    return (
    <div className="Background-Display">
          <Button color="primary" className="button" >Import Local Data</Button>
          <hr style={{color:"blue", height: 2}}/>
          <Button color="primary" className="button">Import Data from cBioportal</Button>
    </div>
    )
  }
}

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Timeline View
        </p>
      </header>
      <Nav tabs>
        <NavItem>
          <NavLink to="/">
            Import
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            Information
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            Chart Display
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            Help
          </NavLink>
        </NavItem>
      </Nav>

      <Router>
        <Route exact path="/" component={ImportDisplay}></Route>
      </Router>
      

      <footer className="App-footer">
        <p>Application powered by <code>React</code></p>
      </footer>
    </div>
  );
}

export default App;
