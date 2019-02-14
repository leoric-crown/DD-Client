import React, { Component } from 'react';
import './App.css';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Nav from './components/nav'
import Characters from './components/characters/Characters'
import Encounters from './components/encounters/Encounters'
import InitiativeTracker from './components/initiativeTracker/InitiativeTracker';
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
