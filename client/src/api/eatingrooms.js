import axios from 'axios'
import {rootUrl, getAuthHeader} from './config'
import {getData, validate} from './parser'
import {getUser} from './user'
import {getId} from '../storage/id'

function postRoom(data) {
  validate(data, ['title', 'date', 'address', 'restaurant','party_size','participants'])
  return axios.post(rootUrl+'eatingrooms', data, getAuthHeader())
    .then(getData)
}

function getUserInfo(participants) {
  return Promise.all(participants.map((uid)=>{
    return getUser(uid).then((user)=>{
      user._id = uid
      return user
    })
  }))
}

export function postNewRoom(data) {
  let user = getId()
  data.user = user
  data.participants = [user]
  return postRoom(data)
}

export function getRoom(_id) {
  console.log(rootUrl+'eatingrooms/'+_id)
  return axios.get(rootUrl+'eatingrooms/'+_id, getAuthHeader())
    .then(getData)
    
}

export function getRooms() {
  let url = rootUrl+'eatingrooms'
  return axios.get(url, getAuthHeader()).then(getData)
    .then((alldata)=>{
      return Promise.all(alldata.map((data)=>{
        let {participants} = data
        data.users = []
        if (participants)
          return getUserInfo(participants).then((users)=>{
            data.users = users
            return data
          })
        return data
      }))
    })
}

export function postMember(_id) {
  return axios.post(rootUrl+'eatingrooms/join/'+_id, {}, getAuthHeader())
    .then(getData)
    .then((data)=>{
      return getUserInfo(data.participants).then((users)=>{
        data.users = users
        return data
      })
    })
}
