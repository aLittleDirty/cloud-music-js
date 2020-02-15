import axios from 'axios'

export function httpGet (url, params = '') {
  return new Promise((resolve, reject) => {
    httpRequest(axios.get(`${url}?${params}`), resolve, reject)
  })
}

export function httpPost (url, params = '') {
  return new Promise((resolve, reject) => {
    httpRequest(axios.post(`${url}?${params}`), resolve, reject)
  })
}

function httpRequest (callbackPromise, resolve, reject) {
  callbackPromise.then((result) => {
    resolve(result.data)
  }).catch((err) => {
    reject(err)
  })
}
