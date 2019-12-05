import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

/* Modules go here */
import HomeModule from './components/homepage_m';
import LoginModule from './components/login_m';
import DashboardModule from './components/dashboard_m';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        {HomeModule.map(module => (
          <Route {...module.routeProps} key={module.name} />
        ))}
        {LoginModule.map(module => (
          <Route {...module.routeProps} key={module.name} />
        ))}
        {DashboardModule.map(module => (
          <Route {...module.routeProps} key={module.name} />
        ))}
      </BrowserRouter>
    );
  }
}

export default App;
