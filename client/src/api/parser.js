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
  if (error.message !== undefined) return error.message
  if (error.errmsg !== undefined) return error.errmsg
  return error.toString()
}

export function validate(data, keys) {
  keys.forEach((k) => {
    console.assert(k in data)
  })
}