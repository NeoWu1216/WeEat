import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { postNewRoom } from "../../api/eatingrooms";
import { getMessage } from "../../api/parser";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import styles from "./eatingroom.scss";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class EatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "First post",
      date: "20:59", // start date
      party_size: 0
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let state = this.props.location.state;
    if (state) {
      this.address = state.location.address1;
      this.image_url = state.image_url;
      this.restaurant = state.name;
    }

    this.selectOptions = [2, 3, 4, 5, 6, 7, 8];
  }

  handleInputChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };
  handlePartySizeChange = e => {
    this.setState({ party_size: e.target.value });
  };
  handleSubmit = event => {
    /*url will be url of api*/
    event.preventDefault();
    event.stopPropagation();

    let room = this.state;
    room.address = this.address;
    room.restaurant = this.restaurant;
    room.image_url = this.image_url;
    room.party_size = this.selectOptions[room.party_size];
    postNewRoom(room)
      .then(response => {
        this.props.history.goBack();
        console.log(response);
      })
      .catch(err => {
        alert(getMessage(err));
      });
  };

  render() {
    if (!this.restaurant || !this.address) return <h3>Go back</h3>;
    console.log(this.props.location.state);

    const selectOptionsList = this.selectOptions.map((selectOption, index) => {
      return (
        <MenuItem key={index} value={index}>
          {selectOption}
        </MenuItem>
      );
    });

    return (
      <div className={styles.eatingroom}>
        <NavBar />
        <div className="create-eatingroom">
          <div className="create-eatingroom-form">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="space-between"
              style={{ padding: "10px", height: "100%" }}
            >
              <Grid item style={{ height: "auto" }}>
                <div className="title">Create A Room</div>
              </Grid>
              <Grid item style={{ width: "80%", height: "auto" }}>
                <form>
                  <Grid direction="column" alignContent="stretch" container>
                    <Grid>
                      <div className="form-group">
                        <label htmlFor="TitleInput">Room Name: </label>
                        <div className="entry">
                          <input
                            type="text"
                            id="title"
                            required
                            value={this.state.title}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="form-group">
                        <label htmlFor="TimeInput">Start From: </label>
                        <div className="entry time">
                          <input
                            id="date"
                            name="start_time"
                            type="datetime-local"
                            required
                            value={this.state.date}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="MeetInput">Meet At:</label>
                        <p>{this.address}</p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="ResInput">What to Eat?</label>
                        <p>{this.restaurant}</p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="SizeInput">Party Size</label>
                        <div className="entry-dropdown">
                          <Select
                            className=".entry-dropdown"
                            id="party_size"
                            value={this.state.party_size}
                            onChange={this.handlePartySizeChange}
                          >
                            {/* <option value="" disabled /> */}
                            {selectOptionsList}
                          </Select>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item style={{ width: "80%" }}>
                <Button
                  fullWidth
                  className="post-room"
                  onClick={this.handleSubmit}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(EatingForm);
