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
