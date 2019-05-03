import React, { Component } from 'react'
import NavBar from "../../components/navbar/navbar";
import { getId } from '../../storage/id'
import Footer from "../../components/footer/footer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { _id, name, email, description, avatar, onEdit } = this.props
    description = description ? description : "This user haven't posted anything"
    let extra = null
    if (getId() == _id)
      extra = (<button className="button1" primary onClick={onEdit} >
        Edit Profile
        </button>)
    var imgstyle = {
      width: "300px",
    };
    return (
      <div>
        <NavBar />
        <div className="profile">
          <div className="profile_left">
            <div className="profile_fields">
              <img className="avatar" style={imgstyle} src={avatar} />
              <hr />
              <div><h3> Name: {name} </h3></div>
              <h3> Email : {email} </h3>
              <hr />
              <h4> Description: {description} </h4>
              {extra}
            </div>
          </div>
          <div className="profile_right">

          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Profile;
