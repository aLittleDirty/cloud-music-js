// localStorage信息存储与获取，存入是一个object，取出是一个object，以musicId为key
let storage = window.localStorage

export function localSet (key, data) {
  key = key.toString()
  let jsonData = JSON.stringify(data)
  storage.setItem(key, jsonData)
}

export function localGet (key) {
  key = key.toString()
  let jsonData = storage.getItem(key)
  return JSON.parse(jsonData)
}