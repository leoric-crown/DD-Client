import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import {Route, Switch } from 'react-router-dom'
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
    );
  }
}

export default App;
