import axios from 'axios'
import {rootUrl, getAuthHeader} from './config'
import {getData, validate} from './parser'
import {getId} from '../storage/id'

export function getUser(_id) {
  return axios.get(rootUrl+'users/'+_id, getAuthHeader())
    .then(getData)
    .then(({eatingrooms, email, name, description})=>(
      {eatingrooms, email, name, description}
    ))
}

export function setUser(_id, data) {
  // if (_id !== getId())
  //   throw "Can't set other user!"
  validate(data, ['name', 'email', 'description'])
  return axios.put(rootUrl+'users/'+_id, data, getAuthHeader())
    .then(getData)
}