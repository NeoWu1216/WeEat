import React, { Component } from "react";
import "./footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="testalign">
              <h6>About</h6>
              <p className="text-justify">Create by: CS 498 RK Team Pikachu</p>
              <p className="text-justify">Contact information: abc@abc.com</p>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div>
              <p className="copyright-text">Copyright &copy; 2019 WeEat. All Rights Reserved.
          </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="facebook" href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
                <li><a className="twitter" href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a></li>
                <li><a className="github" href="https://www.github.com/"><i className="fa fa-github"></i></a></li>
                <li><a className="linkedin" href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
