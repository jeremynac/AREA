import React from "react";
import "./pages/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/homepage';
import Area from './pages/Epitech';
import Profile from './pages/Profile';
import AddArea from './pages/Addarea';
import Download from './Components/Download'

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
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/Area">
            <Area />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/AddArea">
            <AddArea />
          </Route>
          <Route path="/client.apk">
            <Download />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;
