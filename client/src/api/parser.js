export function getData(res) {
  return res.data.data
}

export function getMessage(err) {
  return ('response' in err) ? 
    getError(err.response.data) : err.toString()
}

function getError(data) {
  let error = data.error
  if (error === undefined) return data.toString()
  if (error.errmsg === undefined) return error.toString()
  return error.errmsg
}

export function validate(data, keys) {
  keys.forEach((k) => {
    console.assert(k in data)
  })
}