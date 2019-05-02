import React, {Component} from 'react'
import NavBar from "../../components/navbar/navbar";
import { Card, Icon, Image, Button, Message, Form} from 'semantic-ui-react'
import { getId } from '../../storage/id'
import { setUser } from '../../api/user'
import { getMessage } from '../../api/parser'

class Profile extends Component {
  constructor(props) {
    super(props)
    let {_id, name, email, description} = this.props
    this.state = {
      _id : _id,
      name : name,
      email : email,
      description : description,
      error : null,
    }
  }

  onInputChange = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }

  onSubmit = () => {
    let {_id, name, email, description} = this.state
    setUser(_id, {name, email, description}).then(()=>{
      this.props.onSubmit()
    }).catch((err)=> {
      this.setState({error: getMessage(err)})
    })
  }

  render() {
    let {name, email, description, error} = this.state
    return (
      <div className="profile">
        <NavBar/>
        <Form error={error!==null}>
          <Form.Field>
            <label>Name</label>
            <input id="name" value={name} onChange={this.onInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input id="email" value={email} onChange={this.onInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea id="description" value={description} onChange={this.onInputChange}/>
          </Form.Field>
          <Message error header='Form Failure' content={error} />
        </Form>
        <Button primary onClick={this.onSubmit} >
              Submit Changes
        </Button>
      </div>
    )
  }
}

export default Profile