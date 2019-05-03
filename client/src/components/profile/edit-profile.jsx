import React, { Component } from 'react'
import NavBar from "../../components/navbar/navbar";
import { Button, Form } from 'semantic-ui-react'
import { setUser } from '../../api/user'
import { getMessage } from '../../api/parser'
import Footer from "../../components/footer/footer";
import './edit-profile.scss'

class Profile extends Component {
  constructor(props) {
    super(props)
    let { _id, name, email, description, avatar } = this.props
    this.state = {
      _id: _id,
      name: name,
      email: email,
      description: description,
      avatar: avatar,
      error: null,
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = () => {
    let { _id, name, email, description, avatar } = this.state
    setUser(_id, { name, email, description, avatar }).then(() => {
      this.props.onSubmit()
    }).catch((err) => {
      alert(getMessage(err))
    })
  }

  render() {
    let { name, email, description, avatar, error } = this.state
    return (
      <div>
        <NavBar />
        <div className="edit-profile">
          <div className="edit_form">
            <img src={avatar} alt="avatar" />
            <Form error={error !== null}>
              <Form.Field>
                <label>Avatar</label>
                <input id="avatar" value={avatar} onChange={this.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Name</label>
                <input id="name" value={name} onChange={this.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input id="email" value={email} onChange={this.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea id="description" value={description} onChange={this.onInputChange} />
              </Form.Field>
            </Form>
            <Button primary onClick={this.onSubmit} className="submit_button" >
              Submit Changes
          </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Profile
