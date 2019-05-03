import axios from 'axios'
import {rootUrl, getAuthHeader} from './config'
import {getData, validate} from './parser'
import {getId} from '../storage/id'

function postRoom(data) {
  validate(data, ['title', 'date', 'address', 'restaurant','party_size','participants'])
  return axios.post(rootUrl+'eatingrooms', data, getAuthHeader())
    .then(getData)
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

export function getRooms(where) {
  console.log(where)
  let url = rootUrl+'eatingrooms'
  let extra = ""
  for (const key in where)
    extra+='"'+key+'"'+":"+'"'+where[key]+'"'+","
  if (extra) {
    extra = extra.slice(0, -1)
    url+="?where={"+extra+"}"
  }
  console.log(url)
  return axios.get(url, getAuthHeader()).then(getData)
}

export function postMember(_id) {
  return axios.post(rootUrl+'eatingrooms/join/'+_id, {}, getAuthHeader()).then(getData)
}
