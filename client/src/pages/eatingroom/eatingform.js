import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
        <MenuItem key={index} value={index}>
          {selectOption}
        </MenuItem>
      );
    });

    return (
      <div className="eatingform">
        <Grid
          container
          direction="row"
          alignItems="top"
          justify="center"
          style={{ height: "100%" }}
        >
          <Grid item style={{ padding: "1em 2em" }}>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                style={{ height: "100%" }}
              >
                <Grid item>
                  <div className="form-title">Filter</div>
                </Grid>
                <Grid item>
                  <div className="form-group">
                    <label htmlFor="TitleInput">Room Name: </label>
                    <div className="entry">
                      <input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div className="form-group">
                    <label htmlFor="MeetInput">Meet At: </label>
                    <div className="entry">
                      <input
                        type="text"
                        id="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div className="form-group">
                    <label htmlFor="ResInput">What to Eat?: </label>
                    <div className="entry">
                      <input
                        type="text"
                        id="restaurant"
                        value={this.state.restaurant}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div className="form-group">
                    <label htmlFor="SizeInput">
                      Approximate time (+-1hr):{" "}
                    </label>
                    <div className="entry time">
                      <input
                        type="datetime-local"
                        id="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div className="form-group">
                    <label htmlFor="SizeInput">Party Size: </label>
                    <div className="entry-dropdown">
                      <Select
                        className=".entry-dropdown"
                        value={this.state.party_size}
                        onChange={this.handleInputChange}
                      >
                        {/* <option value="" disabled /> */}
                        {selectOptionsList}
                      </Select>
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary"
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EatingForm;
