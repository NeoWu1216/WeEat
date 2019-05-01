import React, { Component } from 'react'
import NavBar from "../../components/navbar/navbar";
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { getId } from '../../storage/id'
import Footer from "../../components/footer/footer";

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { _id, name, email, description, onEdit } = this.props
    description = description ? description : "This user haven't posted anything"
    let extra = null
    if (getId() == _id)
      extra = (<Card.Content extra>
        <Button primary onClick={onEdit} >
          Edit Profile
            </Button>
      </Card.Content>)
    return (
      <div className="Profile">
        <NavBar />
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <Icon loading name='mail' />
              {email}
            </Card.Meta>
            <Card.Description>
              {description}
            </Card.Description>
          </Card.Content>
          {extra}
        </Card>
        <Footer />
      </div>
    )
  }
}

export default Profile