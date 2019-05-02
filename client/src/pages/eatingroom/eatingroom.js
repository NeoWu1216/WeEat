import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import "./eatingroom.scss";

class EatingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="eatingroom_outer">
        <div id="eatingroom_background">
          <NavBar />
          <div id="eating_room_container">
            <div id="filter_box">
            </div>
            <div className="eating_room_left">
              <EatingRoomList />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


class EatingRoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // TODO: eating rooms
    let result = [{}, {}, {}]
    return (
      <div id="eating_room_list_container">
        {result.map((r, index) => <EatingRoomEntry r={r} key={index} />)}
      </div>
    )
  }
}

class EatingRoomEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="eating_room_card">
          <div className="eating_room_card_left">
            <img src={"https://s3-media1.fl.yelpcdn.com/bphoto/lJOnFchw-mzW6H5IdKh8Zg/o.jpg"} alt="img" />
          </div>
          <div className="eating_room_card_right">
            <h1>title</h1>
            <div className="eating_room_card_right_details">
              <ul>
                <li>Entry1: 1</li><br />
                <li>Entry2: 2</li><br />
                <li>Entry3: 3</li><br />
                <li>Entry4: 4</li><br />
                <li>Entry5: 5</li><br />
              </ul>
              <div className="eating_room_button">
                <a href="/">Join now!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EatingRoom;
