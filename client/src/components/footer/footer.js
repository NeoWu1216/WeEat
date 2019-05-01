import React, { Component } from "react";
import "./footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="testalign">
          <h6>About</h6>
          <p class="text-justify">Create by: CS 498 RK Team Pikachu</p>
          <p class="text-justify">Contact information: abc@abc.com</p>
        </div>
      </div>
      <hr />
    </div>
    <div class="container">
      <div class="row">
        <div>
          <p class="copyright-text">Copyright &copy; © 2019 WeEat. All Rights Reserved.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
            <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
</footer>
    );
  }
}

export default Footer;
