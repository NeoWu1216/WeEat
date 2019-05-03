import React, { Component } from "react";
import { Redirect } from "react-router";
import Footer from "../../components/footer/footer";
import styles from "./main.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { light: "#ffebe", main: "#fa5552" },
    secondary: { main: "#ffebee" }
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      is_login: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(is_login) {
    this.setState({
      redirect: true,
      is_login: is_login
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/auth",
            state: { is_login: this.state.is_login }
          }}
        />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.main}>
          <div className="main-bg">
            <div className="main-navbar">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <a href="/" className="main-logo">
                    WeEat!
                  </a>
                </Grid>
              </Grid>
            </div>
            <div className="main-description">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                  height: "80%",
                  width: "100%"
                }}
              >
                <Grid item>A place to</Grid>
                <Grid item>find friends for food!</Grid>
                <Grid
                  item
                  style={{
                    width: "100%"
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                      paddingTop: ".5em",
                      width: "100%"
                    }}
                  >
                    <Button
                      className="main-btn-signup"
                      onClick={() => this.handleClick(false)}
                    >
                      SIGN UP
                    </Button>
                    <Button
                      className="main-btn"
                      color="secondary"
                      onClick={() => this.handleClick(true)}
                      style={
                        {
                          // marginLeft: "1em",
                          // marginRight: "3em"
                        }
                      }
                    >
                      LOG IN
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default Main;
