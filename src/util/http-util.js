import axios from 'axios'

export function getHttp (url, params) {
  return new Promise((resolve, reject) => {
    httpRequest(axios.get(`${url}?${params}`), resolve, reject)
  })
}

export function httpPost (url, params) {
  return new Promise((resolve, reject) => {
    httpRequest(axios.post(`${url}?${params}`), resolve, reject)
  })
}

function httpRequest (callbackPromise, resolve, reject) {
  callbackPromise.then((result) => {
    if (result.status !== 200) {
      return false
    }
    resolve(result.data)
  }).catch((err) => {
    reject(err)
  })
}
