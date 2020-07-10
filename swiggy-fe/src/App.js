import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Homepage from './pages/homepage';
import Admin from './pages/admin';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Login} ></Route>
            <Route path='/home' component={Homepage} ></Route>
            <Route path='/admin' component={Admin} ></Route>
            <Route path='/signup' component={Signup}></Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;