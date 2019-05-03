import React, { Component } from "react";
import styles from "./navbar.scss";
import { Redirect } from "react-router";
import { getId } from "../../storage/id";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { getUser } from "../../api/user";

const theme = createMuiTheme({
  palette: {
    primary: { light: "#ffebe", main: "#fa5552" },
    secondary: { main: "#ffebee" }
  }
});
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getUser(getId()).then(res => this.setState({ user: res }));
  }

  handleClick(url) {
    if (!window.location.href.includes(url)) {
      this.setState({
        redirect: true,
        redirect_url: url
      });
    }
  }

  render() {
    const { user } = this.state;
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect_url,
            state: {}
          }}
        />
      );
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.navbar}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{
              height: "100%"
            }}
          >
            <Grid item>
              <a href="/" className="logo">
                WeEat
              </a>
            </Grid>
            <Grid item style={{ paddingRight: "1em" }}>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Button
                    className="navbutton"
                    color="secondary"
                    onClick={() => this.handleClick("/restaurant")}
                  >
                    Find Restaurants
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="navbutton"
                    color="secondary"
                    onClick={() => this.handleClick("/eatingroom")}
                  >
                    Eating Rooms
                  </Button>
                </Grid>
                <Grid item>
                  <a onClick={() => this.handleClick("/profile/" + getId())}>
                    <img src={user ? user.avatar : ""} alt="t" />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NavBar;
