import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {ChartPanel} from './ChartPanel/ChartPanel';
import classnames from 'classnames';
import {PythonShell} from 'python-shell';
import { any } from 'prop-types';

class ImportDisplay extends React.Component{
  importMockData(){
    PythonShell.run('/home/julies/Internship_Project/LBDataTimeline/src/public/react/demo-react/src/import/importMockData.py');
    //console.log("Mutation Informations = "+mutInfos)
  }

  render(){
    return (
    <div className="Background-Display">
          <Button color="primary" className="button" onClick={this.importMockData.bind(this)}>Load Sample Data</Button>
          <Button color="primary" className="button" >Import Local Data</Button>
          <Button color="primary" className="button">Import Data from cBioportal</Button>
    </div>
    )
  }
}

export type AppState = {
  activeTab : any;
}


export type AppProps = {
}


class App extends React.Component<AppProps,AppState>{
  constructor(props:AppProps){
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '1'
    };

  }


  toggle(tab:any){
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }


  render(){
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
            <NavLink className={classnames({active: this.state.activeTab ==='1'})} onClick={()=>{this.toggle('1')}}   to="/">
              Import
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({active: this.state.activeTab ==='2'})} onClick={()=>{this.toggle('2')}}  >
             Information
            </NavLink>
          </NavItem>
          <NavItem>
           <NavLink className={classnames({active: this.state.activeTab ==='3'})} onClick={()=>{this.toggle('3')}}   to="/ChartDisplay">
              Chart Display
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({active: this.state.activeTab ==='4'})} onClick={()=>{this.toggle('4')}}>
             Help
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2">
            <Table bordered>
              <thead>
                <tr>
                  <th>GENE ID</th>
                  <th>MUTATION</th>
                  <th>POSITION</th>
                  <th>COVERAGE</th>
                  <th>SUPPORT READS</th>
                  <th>VAF</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
          </TabPane>
        </TabContent>


        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="3">
            <ChartPanel/>
          </TabPane>  
        </TabContent>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ImportDisplay/>
          </TabPane>  
        </TabContent>

        

        <footer className="App-footer">
         <p>Application powered by <code>React</code></p>
        </footer>
      </div>
    );

    async function callExpress() {
      try {
        let response = await fetch('/api/say-hello/SeanMaxwell').then(res => res.json());
        alert('Backend response: ' + response.response);
      } catch (err) {
        alert(err);
      }
    }
    callExpress();
  }
}

export default App;
