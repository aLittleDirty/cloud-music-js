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
export function add (dbName, objectStoreName, message) {
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

// 获取数据库表中的单个数据
export function read (dbName, objectStoreName, keyPath) {
  let database = window.indexedDB.open(dbName)
  database.onsuccess = function (event) {
    database = event.target.result
    let request = database.transaction([objectStoreName]).objectStore(objectStoreName).get(keyPath)
    request.onsuccess = function (event) {
      let result = request.result
      if (!result) {
        return
      }
      // 做想做的事
      console.log(result)
    }
  }
}

// 获取数据库表中的所有数据
export function readAll (dbName, objectStoreName) {
  let database = window.indexedDB.open(dbName)
  database.onsuccess = function (event) {
    database = event.target.result
    if (!database.objectStoreNames.contains(objectStoreName)) {
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
        // 做想做的事
        console.log(storageList)
        console.log('没有更多数据了')
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
