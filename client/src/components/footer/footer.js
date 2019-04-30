import React, { Component } from "react";
import "./footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer>
        <div id="footer_msg">
          <p>Create by: CS 498 RK Team Pikachu</p>
          <p>Contact information: abc@abc.com</p>
          <p>© 2019 WeEat. All Rights Reserved</p>
        </div>
      </footer>
    );
  }
}

export default Footer;