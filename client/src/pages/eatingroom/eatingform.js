import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { withRouter } from 'react-router-dom'
import { postNewRoom } from '../../api/eatingrooms'
import { getMessage } from '../../api/parser'
import "./eatingroom.scss";

class EatingForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
    	title: 'First post',
      // date: '20:59', // start date
      address:'Champaign', //meet point
      restaurant:'Black Dog',
      party_size: '1'
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({[e.target.id]:e.target.value})
  }

  handleSubmit = (event) => {
    /*url will be url of api*/
    event.preventDefault()
    event.stopPropagation()

    // let now = new Date()
    // now.setHours(this.state.date.substr(0,2))
    // now.setMinutes(this.state.date.substr(3,2))
    this.props.onSubmit({...this.state})
  }
  render() {
    const party='0, 1, 2, 3, 4, 5, 6, 7, 8'
    const selectOptions = party.split(', ');
    const selectOptionsList = selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });

    return (
      <div id="form_outer">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="TitleInput">Room Name</label>
            <input type="text" id="title" required value={this.state.title} onChange={this.handleChange} className="form-control" />
          </div>
          {/* <div className="form-group">
            <label htmlFor="TimeInput">Start From</label>
            <input id="date" name="start_time" type="time" min="10:00" max="21:00" required value={this.state.date} onChange={this.handleChange} className="form-control" />
          </div> */}
          <div className="form-group">
            <label htmlFor="MeetInput">Meet At</label>
            <input type="text" id="address" required value={this.state.address} onChange={this.handleChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="ResInput">What to Eat?</label>
            <input type="text" id="restaurant" required value={this.state.restaurant} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="SizeInput">Party Size</label><br />
            <select id="party_size" value={this.state.party_size} onChange={this.handleInputChange}>
              <option value='' disabled></option>
              {selectOptionsList}
            </select>
          </div>

          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

export default EatingForm