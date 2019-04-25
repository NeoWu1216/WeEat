import React, { Component } from "react";
import "./App.scss";
import { HashRouter, Route, Switch } from "react-router-dom";
import Authentification from "./pages/authentification/authentification";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={props => <Authentification />} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
