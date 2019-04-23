import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Login from "./pages/login/login.js";
import { HashRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={props => <Login />} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
