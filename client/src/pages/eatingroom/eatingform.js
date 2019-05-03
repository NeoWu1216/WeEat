import React, { Component } from "react";

class EatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      address: "",
      restaurant: "",
      party_size: 0,
      date: ""
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectOptions = ["any", 2, 3, 4, 5, 6, 7, 8];
  }
  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = event => {
    /*url will be url of api*/
    event.preventDefault();
    event.stopPropagation();

    let party_size = this.selectOptions[this.state.party_size];
    this.props.onSubmit({ ...this.state, party_size });
  };
  render() {
    const selectOptionsList = this.selectOptions.map((selectOption, index) => {
      return (
        <option key={index} value={index}>
          {selectOption}
        </option>
      );
    });

    return (
      <div className="eatingform">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="TitleInput">Room Name</label>
            <input
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="MeetInput">Meet At</label>
            <input
              type="text"
              id="address"
              value={this.state.address}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ResInput">What to Eat?</label>
            <input
              type="text"
              id="restaurant"
              value={this.state.restaurant}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SizeInput">Approximate time (+-1hr)</label>
            <input
              type="datetime-local"
              id="date"
              value={this.state.date}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="SizeInput">Party Size</label>
            <br />
            <select
              id="party_size"
              value={this.state.party_size}
              onChange={this.handleInputChange}
            >
              <option value="" disabled />
              {selectOptionsList}
            </select>
          </div>

          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default EatingForm;
