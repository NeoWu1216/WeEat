import React, { Component } from "react";
import styles from "./login.scss";

class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <div className="container">
          <div className="title" />
          <div className="login-container">
            <h1>Login</h1>
            <div className="login-email">
              <i class="fas fa-envelope" />
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />
            </div>
            <div className="login-password">
              <i class="fas fa-key" />
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
            </div>

            <button type="submit">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember" />
              Remember me
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
