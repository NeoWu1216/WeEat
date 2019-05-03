import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { withRouter } from 'react-router-dom'
import { postNewRoom } from '../../api/eatingrooms'
import { getMessage } from '../../api/parser'
import "./eatingroom.scss";
import axios from 'axios'

class EatingForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
    	title: 'First post',
      date: '20:59', // start date
      party_size: 0
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let state = this.props.location.state
    if (state) {
      this.address = state.location.address1;
      this.image_url = state.image_url;
      this.restaurant = state.name;
    }

    this.selectOptions = [2,3,4,5,6,7,8]
  }

  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({[e.target.id]:e.target.value})
  }

  handleSubmit = (event) => {
    /*url will be url of api*/
    event.preventDefault()
    event.stopPropagation()
    
    let room = this.state 
    room.address = this.address
    room.restaurant = this.restaurant
    room.image_url = this.image_url
    room.party_size = this.selectOptions[room.party_size]
    postNewRoom(room).then((response)=>{
      this.props.history.goBack()
      console.log(response)
    }).catch((err)=>{
      alert(getMessage(err))
    })
  }
  render() {
    if (!this.restaurant || !this.address)
      return <h3>Go back</h3>
    console.log(this.props.location.state)

    
    const selectOptionsList = this.selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });

    return (
      <div id="form_outer">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="TitleInput">Room Name</label>
            <input type="text" id="title" required value={this.state.title} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="TimeInput">Start From</label>
            <input id="date" name="start_time" type="datetime-local" required value={this.state.date} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="MeetInput">Meet At</label>
            <p>{this.address}</p>
          </div>
          <div className="form-group">
            <label htmlFor="ResInput">What to Eat?</label>
            <p>{this.restaurant}</p>
          </div>

          <div className="form-group">
            <label htmlFor="SizeInput">Party Size</label><br />
            <select id="party_size" name="party_size" value={this.state.party_size} onChange={this.handleInputChange}>
              <option value='' disabled></option>
              {selectOptionsList}
            </select>
          </div>

          <input type="submit" value="Post Room" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

export default withRouter(EatingForm)