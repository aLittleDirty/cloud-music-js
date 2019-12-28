import { getHttp } from '../util/http-util'

export function getBillboard () {
  let path = '/toplist'
  let params = ''
  let billBoardRawData = getHttp(path, params)
  return billBoardRawData.then((result) => {
    let list = []
    for (let i = 0; i < result.list.length; i++) {
      list.push({ name: result.list[i].name, coverImg: result.list[i].coverImgUrl, id: result.list[i].id })
    }
    return list
  })
}
/*
export function getLyric (musicId) {
  let path = '/lyric'
  let params = `id=${musicId}`
  return getHttp(path, params, (result) => {
    let lyric = result.lrc.lyric
    return lyric
  }, (err) => {
    console.log(err)
  })
}

export function getMusicMessage (billBoardId) {
  new Promise((resolve, reject) => {
    let musicIds = getMusicIds(billBoardId)
    musicIds && resolve(musicIds)
  }).then((musicIds) => {
    let p1 = new Promise((resolve, reject) => {
      let musicLists = getMusicList(musicIds)
      musicLists && resolve(musicLists)
    })
    let p2 = new Promise((resolve, reject) => {
      let musicUrls = getMusicURLs(musicIds)
      musicIds && resolve(musicUrls)
    })
    combineMusicMessage(p1, p2)
  })
}

function combineMusicMessage (p1, p2) {
  Promise.all([p1, p2]).then((result) => {
    let musicLists = result[0]
    let musicUrls = result[1]
    let musicMessages = []
    for (let i = 0; i < musicLists.length; i++) {
      let musicMessage = Object.assign(musicLists[i], { path: musicUrls[i] })
      musicMessages.push(musicMessage)
    }
    return musicMessages
  })
}

function getMusicIds (billBoardId, callback) {
  let path = '/playlist/detail'
  let params = `id=${billBoardId.toString()}`
  getHttp(path, params, (result) => {
    let list = []
    let dataList = result.playlist.tracks
    for (let i = 0; i < dataList.length; i++) {
      list.push(dataList[i].id)
    }
    callback(list)
  }, (err) => {
    console.log(err)
  })
}

function getMusicURLs (musicIds) {
  // let path = '/song/path'
  // let params = `id=${musicIds.join(',')}`
  // return getHttp(path, params, (result) => {
  //   let list = []
  //   for (let i = 0; i < result.data.length; i++) {
  //     list.push(result.data[i].path)
  //   }
  //   return list
  // }, (err) => {
  //   console.log(err)
  // })
}

function getMusicList (musicIds) {
  // let path = '/song/detail'
  // let params = `ids=${musicIds.join(',')}`
  // return getHttp(path, params, (result) => {
  //   let list = []
  //   let songs = result.songs
  //   for (let i = 0; i < songs.length; i++) {
  //     list.push({ name: songs[i].name, id: songs[i].id, author: songs[i].ar[0].name, albumName: songs[i].al.name, albumImg: songs[i].al.picUrl })
  //   }
  //   return list
  // }, (err) => {
  //   console.log(err)
  // })
}
*/
