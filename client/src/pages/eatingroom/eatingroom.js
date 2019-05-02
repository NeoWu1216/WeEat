import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import EatingForm from './eatingform'
import { withRouter } from 'react-router-dom'
import { getRooms } from "../../api/eatingrooms"
import { getMessage } from "../../api/parser"

import "./eatingroom.scss";

class EatingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {eatingrooms:[]};
  }

  componentDidMount() {
    getRooms({}).then((data)=> {
      console.log('data',data)
      this.setState({eatingrooms:data})
    }).catch(err=>alert(getMessage(err)))
  }

  onSubmit(data) {
    getRooms(data).then((data)=> {
      this.setState({eatingrooms:data})
    }).catch(err=>alert(getMessage(err)))
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
              <EatingRoomList eatingrooms={this.state.eatingrooms}/>
              <button className="eating_room_button" onClick={()=>this.props.history.push('create-eatingroom')}>
                Click me!
              </button>
            </div>
            
            <div className="eating_room_right">
              <EatingForm/>
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
  }
  

  render() {
    let result = this.props.eatingrooms
    console.log(result)
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
  }
  render() {
    let room = this.props.r
    return (
      <div>
        <div className="eating_room_card">
          <div className="eating_room_card_left">
            <img src={"https://s3-media1.fl.yelpcdn.com/bphoto/lJOnFchw-mzW6H5IdKh8Zg/o.jpg"} alt="img" />
          </div>
          <div className="eating_room_card_right">
            <h1>{room.title}</h1>
            <h1>{room.restaurant}</h1>
            <h1>{room.address}</h1>
            <h1>{room.date}</h1>

            <div className="eating_room_card_right_details">
              <ul>
                {room.participants.map((uid)=>(<li>{uid}</li>))}
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

export default withRouter(EatingRoom);
