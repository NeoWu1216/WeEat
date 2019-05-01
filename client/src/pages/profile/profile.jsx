import ProfileView from '../../components/profile/profile'
import {getUser, setUser} from '../../api/user'
import {getMessage} from '../../api/parser'
import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id : "",
      name : "",
      email : "",
      description : "",
      edit : false
    }
  }

  getUser = (_id) => {
    return getUser(_id).then(({name, email, description})=>{
      this.setState({_id, name, email, description})
    }).catch((err)=>{
      alert(getMessage(err))
    })
  }

  componentDidMount() {
    let _id = this.props.match.params.id;
    this.getUser(_id)
  }

  onEdit = () => {
    this.setState({edit: true})
  }

  onView = () => {
    this.setState({edit: false})
  }

  render() {
    let {_id, name, email, description, edit} = this.state
    if (!_id) return <h1> User not found</h1>
    if (!edit) 
      return <ProfileView name={name} email={email} 
        description={description} onEdit={this.onEdit} _id={_id}/>
    return null
  }
}
