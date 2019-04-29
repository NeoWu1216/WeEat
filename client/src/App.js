import React, { Component } from "react";
import "./App.scss";
import { HashRouter, Route, Switch } from "react-router-dom";
import Authentification from "./pages/authentification/authentification";
import Main from "./pages/main/main";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={Main} />
            <Route exact path={"/auth"} component={Authentification} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
