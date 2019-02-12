import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import Nav from './components/Nav'
import Characters from './components/Characters'
import Encounters from './components/Encounters'
import InitiativeTracker from './components/InitiativeTracker';
import { Route, Switch } from 'react-router-dom'
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Nav />
        </Switch>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route exact path='/dashboard' component={Characters} />
          <Route path='/dashboard/characters' component={Characters} />
          <Route exact path='/dashboard/encounters' component={Encounters} />
          <Route exact path='/dashboard/initiativeTracker' component={InitiativeTracker}/>
        </Switch>
      </div>
    );
  }
}

export default App;
