import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import EatingForm from './eatingform'
import { withRouter } from 'react-router-dom'
import { getRooms, postMember } from "../../api/eatingrooms"
import { getMessage } from "../../api/parser"
import { getId } from '../../storage/id'
import "./eatingroom.scss";

class EatingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {eatingrooms:[], mounted: false};
  }

  componentDidMount() {
    if (!this.state.mounted)
    getRooms({}).then((data)=> {
      this.setState({eatingrooms:data, mounted:true})
    }).catch(err=>alert(getMessage(err)))
  }

  onSubmit = (data) => {
    getRooms(data).then((data)=> {
      console.log(data)
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
              <EatingForm onSubmit={this.onSubmit}/>
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
    this.state = {room: this.props.r}
  }
  onJoin(e, _id) {
    e.preventDefault()
    e.stopPropagation()
    postMember(_id).then((data)=> {
      console.log('join',data)
      this.setState({room: data})
    }).catch(err=> {
      alert(getMessage(err)) 
      console.log(err.response)
    })
  }

  render() {
    let {room} = this.state
    if (!room) return null
    if ( room.participants===undefined) return null
    if ( room.participants===null ) 
      room.participants = []
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
                {room.participants.map((uid)=>(<li key={uid}>{uid}</li>))}
              </ul>
              <div className="eating_room_button" onClick={(e)=>this.onJoin(e, room._id)}>
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
