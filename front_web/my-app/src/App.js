import React from "react";
import "./pages/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        {}
        <Switch>
        <Route exact path="/">
            < HomePage/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;
