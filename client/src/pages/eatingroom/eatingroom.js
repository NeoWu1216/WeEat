import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";

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
        <NavBar />
      </div>
    );
  }
}

export default EatingRoom;