import axios from 'axios'
import {rootUrl} from './config'
import {getData, validate} from './parser'

function signUp(data) {
  validate(data, ['name', 'email', 'password'])
  return axios.post(rootUrl+'users/signup', { user: data })
    .then(getData)
    .then((data)=> {
      //unnecessary, but for documentary
      let {token, email} = data
      return {token, email}
    })
}

function login(data) {
  validate(data, ['email', 'password'])
  return axios.post(rootUrl+'users/login', { user: data })
    .then(getData)
    .then((data)=> {
      let {token, email} = data
      return {token, email}
    })
}

export {signUp, login}