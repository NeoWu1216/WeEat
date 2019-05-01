const shared_key = 'token'

function getToken() {
  return sessionStorage.getItem(shared_key)
}

function setToken(token) {
  return sessionStorage.setItem(shared_key, token)
}

export {setToken, getToken}