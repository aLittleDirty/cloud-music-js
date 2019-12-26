import axios from 'axios'

export function getHttp (url, params, successCallback, errCallback) {
  return axios.get(`${url}?${params}`).then((result) => {
    if (result.status !== 200) {
      return false
    }
    return successCallback(result.data)
  }).catch((err) => {
    errCallback(err)
  })
}
