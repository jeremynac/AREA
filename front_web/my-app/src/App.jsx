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
import Epitech from './pages/Epitech';
import Facebook from './pages/Facebook';
import RSS from './pages/RSS';
import OneDrive from './pages/OneDrive';
import Outlook from './pages/Outlook';
import Timer from './pages/Timer';
import Profile from './pages/Profile';



function App() {
  return (
    <div className="App">
      <Router>
      <div>
        {}
        <Switch>
        <Route exact path="/">
            < Login/>
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/Epitech">
            <Epitech />
          </Route>
          <Route path="/Facebook">
            <Facebook />
          </Route>
          <Route path="/RSS">
            <RSS />
          </Route>
          <Route path="/Onedrive">
            <OneDrive />
          </Route>
          <Route path="/Outlook">
            <Outlook />
          </Route>
          <Route path="/Timer">
            <Timer />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;