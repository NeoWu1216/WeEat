const shared_key = '_id'

function getId() {
  return sessionStorage.getItem(shared_key)
}

function setId(token) {
  return sessionStorage.setItem(shared_key, token)
}

export {setId, getId}