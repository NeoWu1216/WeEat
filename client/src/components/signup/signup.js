import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {signUp} from '../../api/auth'
import {getMessage} from '../../api/parser'
import {withRouter} from 'react-router-dom'
import {setToken} from '../../storage/token'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : "",
      name : ""
    }
  }

  displaySignupHandler = () => {
    this.props.changeDisplay();
  };

  onSubmit = (e) => {
    // for safety, parse correct fields first
    let {email, password, name} = this.state
    let data = {email, password, name}
    signUp(data).then(({token}) => {
      setToken(token)
    }).then(()=>{
      this.props.history.replace('restaurant')
    })
    .catch((err)=>{
      alert(getMessage(err))
    })
  }

  onInputChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    return (
      <div>
        <Grid item>
          <div className="entry">
            <i className="fas fa-user" />
            <input type="text" placeholder="Name *" 
              id = "name" value = {this.state.name} onChange={this.onInputChange}
              name="uname" required />
          </div>
        </Grid>
        <Grid item>
          <div className="entry">
            <i className="fas fa-envelope" />
            <input type="text" placeholder="Email *" 
              id = "email" value = {this.state.email} onChange={this.onInputChange}
              name="uemail" required />
          </div>
        </Grid>
        <Grid item>
          <div className="entry">
            <i className="fas fa-key" />
            <input
              type="password"
              placeholder="Password *"
              id = "password" 
              value = {this.state.password} 
              onChange={this.onInputChange}
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
                onClick={this.onSubmit}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Signup);
