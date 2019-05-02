import {getToken} from '../storage/token'

const rootUrl = 'http://localhost:4000/api/'
console.log("rootUrl: "+rootUrl) // test global

const getAuthHeader = () => {
  return {headers: {
    'Authorization': 'Token '+getToken()
  }}
}


export {rootUrl, getAuthHeader}