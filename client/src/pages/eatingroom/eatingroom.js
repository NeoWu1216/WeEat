import React, { Component } from "react";

import "./eatingroom.scss";

class EatingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="eatingroom_outer">
        <div id="eatingroom_navbar">
          <a href="/" id="eatingroom_logo">WeEat</a>
          <div id="eatingroom_navbar_right">
            <button type="button" id="restaurants_button">Restaurants</button>
            <button type="button" id="profile_icon"><i class="fa fa-user-circle"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default EatingRoom;