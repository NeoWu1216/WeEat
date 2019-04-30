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
        <EatingRoomList />
        <FiterBox />
      </div>
    );
  }
}

class EatingRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div className="list_background">
          <section className="eatingroom-list">
            <button className="eatingroom-button">
              blahblah
            </button>
          </section>
        </div>
      </div>
    );
  }
}

class FiterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="filter_box">
        Filter box
      </div>
    );
  }
}

export default EatingRoom;