import React, { Component } from 'react';
import './App.css';
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Nav from './components/nav'
import Characters from './pages/Characters'
import Encounters from './pages/Encounters'
import InitiativeTracker from './pages/InitiativeTracker';
import UserControl from './pages/UserControl'
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
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/characters' component={Characters} />
          <Route exact path='/encounters' component={Encounters} />
          <Route exact path='/initiativeTracker' component={InitiativeTracker} />
          <Route exact path='/user' component={UserControl} />

        </Switch>
      </div>
    );
  }
}

export default App;
