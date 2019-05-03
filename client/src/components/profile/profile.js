import React, { Component } from 'react'
import NavBar from "../../components/navbar/navbar";
import { getId } from '../../storage/id'
import { getMessage } from '../../api/parser'
import { getRooms } from '../../api/eatingrooms'
import Footer from "../../components/footer/footer";
import { EatingRoomList } from '../../pages/eatingroom/eatingroom'
import styles from '../../pages/profile/profile.scss'

class Eatingroom extends Component {
  constructor(props) {
    super(props);
    this.state = { all: [], eatingrooms: [], mounted: false };
  }

  componentDidMount() {
    if (!this.state.mounted)
      getRooms({})
        .then(data => {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          data = data.filter(x => x.user === getId())
          this.setState({ eatingrooms: data, all: data, mounted: true });
        })
        .catch(err => alert(getMessage(err)));
  }

  notify = (data, ix, mess) => {
    if (mess === "join") {
      let { eatingrooms } = this.state;
      eatingrooms[ix] = data;
      this.setState({ eatingrooms });
    } else if (mess == "delete") {
      let { eatingrooms } = this.state;
      eatingrooms.splice(ix);
      this.setState({ eatingrooms });
    }
  };

  render() {
    return (
      <div id="profile_list_container">
        <EatingRoomList
          eatingrooms={this.state.eatingrooms}
          notify={this.notify}
        />
      </div>
    )
  }
}


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { _id, name, email, phone, description, avatar, onEdit } = this.props
    description = description ? description : "This user haven't posted anything"
    let extra = null
    if (getId() === _id)
      extra = (<button className="button1" onClick={onEdit} >
        Edit Profile
        </button>)
    return (
      <div className={styles.profile}>
        <div id="profile_bg">
          <NavBar />
          <div className="profile">
            <div className="profile_left">
              <div className="profile_fields">
                <img className="avatar" src={avatar} alt="avatar" />
                <hr />
                <h3> Name: {name} </h3>
                <h3> Email : {email} </h3>
                <h3> Phone number : {phone} </h3>
                <hr />
                <h4> Description: {description} </h4>
                {extra}
              </div>
            </div>
            <div className="profile_right">
              <Eatingroom />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Profile;
