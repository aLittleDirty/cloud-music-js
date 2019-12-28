import axios from 'axios'

export function getHttp (url, params) {
  return new Promise((resolve, reject) => {
    get(url, params, resolve, reject)
  })
}

function get (url, params, resolve, reject) {
  axios.get(`${url}?${params}`).then((result) => {
    if (result.status !== 200) {
      return false
    }
    resolve(result.data)
  }).catch((err) => {
    reject(err)
  })
}
