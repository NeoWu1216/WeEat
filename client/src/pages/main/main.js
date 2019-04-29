import React, { Component } from "react";
import { Redirect } from 'react-router';

import "./main.scss";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      is_login: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(is_login) {
    this.setState({
      redirect: true,
      is_login: is_login
    });
  }

  render() {
    if (this.state.redirect) {
      let tmp = this.state.is_login
      return <Redirect to={{
        pathname: "/auth",
        state: { is_login: tmp }
      }}
      />
    }
    return (
      <div id="main_outer">
        <div id="main_navbar">
          <a href="/" id="main_logo">WeEat</a>
          <div id="navbar-right">
            <button type="button" id="joinnow" onClick={() => this.handleClick(false)}>Join now</button>
            <button type="button" id="signin" onClick={() => this.handleClick(true)}>Sign in</button>
          </div>
        </div>
        <div id="main_description"><span>A place<br /> to find friends for food!</span></div>
      </div>
    );
  }
}

export default Main;