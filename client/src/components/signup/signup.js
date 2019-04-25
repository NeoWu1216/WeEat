import React, { Component } from "react";
import styles from "./signup.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class Signup extends Component {
  constructor(props) {
    super();
  }

  displayChangeHandler = () => {
    this.props.changeDisplay();
  };

  render() {
    return (
      <div className={styles.signup}>
        <Grid item>
          <div className="signup-entry">
            <i class="fas fa-user" />
            <input type="text" placeholder="Name*" name="uname" required />
          </div>
        </Grid>
        <Grid item>
          <div className="signup-entry">
            <i class="fas fa-envelope" />
            <input type="text" placeholder="Email*" name="uemail" required />
          </div>
        </Grid>
        <Grid item>
          <div className="signup-entry">
            <i class="fas fa-key" />
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
              <div className="login-message">
                Already have an account?
                <Button
                  size="small"
                  style={{
                    "font-family": '"Roboto Slab", serif',
                    "text-transform": "capitalize",
                    color: "#FFA630",
                    margin: 0,
                    padding: 0,
                    "font-weight": "bolder",
                    "margin-left": "-1em"
                  }}
                  onClick={this.displayChangeHandler}
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
