import React, { Component } from 'react'
import NavBar from "../../components/navbar/navbar";
import { getId } from '../../storage/id'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { _id, name, email, description, onEdit } = this.props
    description = description ? description : "This user haven't posted anything"
    let extra = null
    if (getId() == _id)
      extra = (<button primary onClick={onEdit} >
          Edit Profile
        </button>)
    return (
      <div>
        <NavBar />
        <div className="profile">
          <img className="avatar" src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'/>
          <h3> Name: {name} </h3>
          <h3> Email : {email} </h3>
          <h3> Description: {description} </h3>
          {extra}
        </div>
      </div>
    )
  }
}

export default Profile