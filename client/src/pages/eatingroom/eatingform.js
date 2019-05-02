import React, { Component } from "react";

class EatingForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
    	title: '',
      start_time: '',
      meet_point:'',
      restaurant:'',
      party_size:2,
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    /*url will be url of api*/
    this.props.onSubmit(this.state)
    event.preventDefault();
  }
  render() {
    const party='2, 3, 4, 5, 6, 7, 8'
    const selectOptions = party.split(', ');
    const selectOptionsList = selectOptions.map((selectOption, index) => {
      return <option key={index} value={index}>{selectOption}</option>
    });

    return (
      <div id="form_outer">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="TitleInput">Room Name</label>
            <input type="text" name="title" required value={this.state.title} onChange={this.handleChange} className="form-control" id="TitleInput" />
          </div>
          <div className="form-group">
            <label htmlFor="TimeInput">Start From</label>
            <input name="start_time" type="time" min="10:00" max="21:00" required value={this.state.keyword} onChange={this.handleChange} className="form-control" id="TimeInput" />
          </div>
          <div className="form-group">
            <label htmlFor="MeetInput">Meet At</label>
            <input type="text" name="meet_point" required value={this.state.meet_point} onChange={this.handleChange} className="form-control" id="MeetInput" />
          </div>
          <div className="form-group">
            <label htmlFor="ResInput">What to Eat?</label>
            <input type="text" name="restaurant" required value={this.state.restaurant} onChange={this.handleChange} className="form-control" id="ResInput" />
          </div>
          <div className="form-group">
            <label htmlFor="SizeInput">Party Size</label><br />
            <select name="party_size" value={this.state.party_size} onChange={this.handleChange}>
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

export default EatingForm