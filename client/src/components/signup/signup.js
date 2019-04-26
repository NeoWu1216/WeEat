import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class Signup extends Component {
  constructor(props) {
    super();
  }

  displaySignupHandler = () => {
    this.props.changeDisplay();
  };

  render() {
    return (
      <div>
        <Grid item>
          <div className="entry">
            <i className="fas fa-user" />
            <input type="text" placeholder="Name*" name="uname" required />
          </div>
        </Grid>
        <Grid item>
          <div className="entry">
            <i className="fas fa-envelope" />
            <input type="text" placeholder="Email*" name="uemail" required />
          </div>
        </Grid>
        <Grid item>
          <div className="entry">
            <i className="fas fa-key" />
            <input
              type="password"
              placeholder="Password*"
              name="psw"
              required
            />
          </div>
        </Grid>
        <Grid item xs>
          <Grid
            container
            alignContent="center"
            justify="center"
            direction="row"
            style={{ margin: "20px 0" }}
          >
            <Grid item xs>
              <div className="auth-message">
                Already have an account?
                <Button
                  size="small"
                  style={{
                    fontFamily: '"Roboto Slab", serif',
                    textTransform: "capitalize",
                    color: "#FFA630",
                    padding: 0,
                    fontWeight: "bolder",
                    marginLeft: "-1em"
                  }}
                  onClick={this.displaySignupHandler}
                >
                  Login
                </Button>
              </div>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                style={{
                  width: "125px",
                  color: "#FFEBEE",
                  background: "#26547C",
                  float: "right"
                }}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Signup;
