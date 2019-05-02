import ProfileView from '../../components/profile/profile'
import ProfileEditView from '../../components/profile/edit-profile'
import {getUser} from '../../api/user'
// import {getUser, setUser} from '../../api/user'
import {getMessage} from '../../api/parser'
import React, { Component } from 'react'
import './profile.scss'

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

  getUser = () => {
    let _id = this.props.match.params.id;
    return getUser(_id).then(({name, email, description})=>{
      this.setState({_id, name, email, description})
    }).catch((err)=>{
      alert(getMessage(err))
    })
  }

  componentDidMount() {
    this.getUser()
  }

  onEdit = () => {
    this.setState({edit: true})
  }

  onView = () => {
    this.getUser().then(()=>{
      this.setState({edit: false})
    })
  }

  render() {
    let {_id, name, email, description, edit} = this.state
    if (!_id) return <h1> User not found</h1>
    if (!edit) 
      return <ProfileView name={name} email={email} 
        description={description} onEdit={this.onEdit} _id={_id}/>
    return <ProfileEditView name={name} email={email}
      description={description} onSubmit={this.onView} _id={_id}/>
  }
}
