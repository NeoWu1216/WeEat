import React, { Component } from "react";
import styles from "./authentification.scss";
import Grid from "@material-ui/core/Grid";
import Login from "../../components/login/login.js";
import Signup from "../../components/signup/signup.js";

class Authentification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplayLogin: true,
      name: "",
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      if (this.props.location.state.is_login) {
        this.setState({
          shouldDisplayLogin: true
        });
      } else {
        this.setState({
          shouldDisplayLogin: false
        })
      }
    }
  }
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
        <h1>{this.state.name}</h1>
        <div className="auth-img" />
        <div className="auth">
          <div className="auth-content">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ height: "100%" }}
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
