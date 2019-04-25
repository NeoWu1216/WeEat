import React, { Component } from "react";
import styles from "./login.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class Login extends Component {
  constructor(props) {
    super();
  }

  displayChangeHandler = () => {
    this.props.changeDisplay();
  };

  render() {
    return (
      <div className={styles.login}>
        <Grid item>
          <div className="login-entry">
            <i class="fas fa-envelope" />
            <input type="text" placeholder="Email" name="uname" required />
          </div>
        </Grid>
        <Grid item>
          <div className="login-entry">
            <i class="fas fa-key" />
            <input type="password" placeholder="Password" name="psw" required />
          </div>
        </Grid>
        <Grid item xs>
          <Grid
            container
            alignContent="center"
            justify="center"
            direction="row"
            style={{ margin: "20px 0" }}
            onClick={this.displayChangeHandler}
          >
            <Grid item xs>
              <div className="signup-message">
                Don't have an account?
                <Button
                  size="small"
                  style={{
                    "font-family": '"Roboto Slab", serif',
                    "text-transform": "capitalize",
                    color: "#FFA630",
                    padding: 0,
                    "font-weight": "bolder",
                    "margin-left": "-.5em"
                  }}
                >
                  Register
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
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
