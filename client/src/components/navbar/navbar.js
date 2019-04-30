import React, { Component } from 'react';
import './navbar.scss';
import { Redirect } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(url) {
    if (!window.location.href.includes(url)) {
      this.setState({
        redirect: true,
        redirect_url: url
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect_url,
        state: {}
      }}
      />
    }
    return (
      <div id="navbar">
        <a href="/" id="logo">WeEat</a>
        <div id="navbar_right">
          <button type="button" className="navbar_button" onClick={() => this.handleClick("/eatingroom")}>Eating Rooms</button>
          <button type="button" className="navbar_button" onClick={() => this.handleClick("/restaurant")}>Restaurants</button>
          <button type="button" id="profile_icon"><i className="fa fa-user-circle"></i></button>
        </div>
      </div>
    )
  }
}


export default NavBar;
