import React, { Component } from "react";
import styles from "./authentification.scss";
import Grid from "@material-ui/core/Grid";
import Login from "../../components/login/login.js";
import Signup from "../../components/signup/signup.js";

class Authentification extends Component {
  state = {
    shouldDisplayLogin: false
  };

  onUpdateAuthDisplay() {
    let currVal = this.state.shouldDisplayLogin;
    this.setState({
      shouldDisplayLogin: !currVal
    });
  }

  selectContentDisplay() {
    if (this.state.shouldDisplayLogin) {
      return <Login changeDisplay={this.onUpdateAuthDisplay.bind(this)} />;
    }
    return <Signup changeDisplay={this.onUpdateAuthDisplay.bind(this)} />;
  }

  render() {
    return (
      <div className={styles.authentification}>
        <div className="auth-img" />
        <div className="auth">
          <div className="auth-content">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <div className="logo-title">weEat!</div>
              </Grid>
              {this.selectContentDisplay()}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Authentification;
