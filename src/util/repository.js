// localStorage存储
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

// indexedDB数据库
// 创建数据库，并添加数据库表，设置主键和索引；设置requests,用于存放添加成功的回调函数
export function initDataBase (dbName, objectStoreNameList, keyPathName, indexName) {
  let request = window.indexedDB.open(dbName)
  request.onupgradeneeded = function (event) {
    let database = event.target.result
    for (let i in objectStoreNameList) {
      if (!database.objectStoreNames.contains(objectStoreNameList[i])) {
        let objectStore = null
        objectStore = database.createObjectStore(objectStoreNameList[i], { keyPath: keyPathName })
        objectStore.createIndex(indexName, indexName, { unique: false })
      }
    }
  }
}

// 添加数据
export function addIndexedDBStore (dbName, objectStoreName, message) {
  let database = window.indexedDB.open(dbName)
  database.onsuccess = function (event) {
    database = event.target.result
    if (database.objectStoreNames.contains(objectStoreName)) {
      database.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).add(message)
    }
  }
}

// 更新数据
export function update (dbName, objectStoreName, message) {
  let database = window.indexedDB.open(dbName)
  database.onsuccess = function (event) {
    database = event.target.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
      return
    }
    let request = database.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).put(message)
    request.onerror = function (event) {
      console.log('数据更新失败')
    }
  }
}

// 删除数据
export function remove (dbName, objectStoreName, keyPath) {
  let request = window.indexedDB.open(dbName)
  request.onsuccess = function (event) {
    let database = request.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
      return
    }
    database.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).delete(keyPath)
  }
}

// 获取单个数据并返回一个promise对象
export function promiseRead (dbName, objectStoreName, keyPath) {
  return new Promise((resolve, reject) => {
    read(dbName, objectStoreName, keyPath, resolve, reject)
  })
}

// 获取一个数据库表的数据并返回一个promise对象
export function promiseReadAll (dbName, objectStoreName) {
  return new Promise((resolve, reject) => {
    readAll(dbName, objectStoreName, resolve, reject)
  })
}

// 获取数据库表中的单个数据
function read (dbName, objectStoreName, keyPath, successCallback, failCallback) {
  let database = window.indexedDB.open(dbName)
  database.onerror = function (event) {
    failCallback()
  }
  database.onsuccess = function (event) {
    database = event.target.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
      failCallback()
      return
    }
    let request = database.transaction([objectStoreName]).objectStore(objectStoreName).get(keyPath)
    request.onsuccess = function (event) {
      let result = request.result
      if (!result) {
        failCallback()
        return
      }
      successCallback(result)
    }
  }
}

// 获取数据库表中的所有数据
function readAll (dbName, objectStoreName, successCallback, failCallback) {
  let database = window.indexedDB.open(dbName)
  database.onerror = function (event) {
    failCallback()
  }
  database.onsuccess = function (event) {
    database = event.target.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
      failCallback()
      return
    }
    let storageList = []
    let objectStore = database.transaction(objectStoreName).objectStore(objectStoreName)
    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result
      if (cursor) {
        storageList.push(cursor.value)
        cursor.continue()
      } else {
        successCallback(storageList)
      }
    }
  }
}

// 通过自定义的索引获取数据
export function getIndex (dbName, objectStoreName, key, value) {
  let database = window.indexedDB.open(dbName)
  database.onsuccess = function (event) {
    database = event.target.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
      return
    }
    let store = database.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName)
    let index = store.index(key)
    let request = index.get(value)
    request.onsuccess = function (event) {
      let result = event.target.result
      if (result) {
        console.log(result)
      } else {
        console.log('无法获取指定的值，可能该值不存在')
      }
    }
  }
}
