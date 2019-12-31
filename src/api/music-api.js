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
*/

export function getMusicMessage (musicId) {
  if (Array.isArray(musicId)) {
    musicId = musicId.join(',')
  }
  let musicDetail = getMusicDetail(musicId)
  let musicUrl = getMusicUrl(musicId)
  return mergeMessage(musicDetail, musicUrl)
}

function mergeMessage (p1, p2) {
  return Promise.all([p1, p2]).then((result) => {
    let musicDetail = result[0]
    let musicUrl = result[1]
    let musicMessages = []
    for (let i in musicDetail) {
      let musicMessage = Object.assign(musicDetail[i], musicUrl[i])
      musicMessages.push(musicMessage)
    }
    if (musicMessages.length === 1) {
      musicMessages = musicMessages[0]
    }
    return musicMessages
  })
}

export function getMusicIds (billBoardId) {
  let path = '/playlist/detail'
  let params = `id=${billBoardId.toString()}`
  let rawMusicIds = getHttp(path, params)
  return rawMusicIds.then((result) => {
    let list = []
    for (let i in result.privileges) {
      list.push(result.privileges[i].id)
    }
    return list
  })
}

export function getMusicUrl (musicId) {
  let path = '/song/url'
  if (Array.isArray(musicId)) {
    musicId = musicId.join(',')
  }
  let params = `id=${musicId}`
  let rawMusicUrls = getHttp(path, params)
  return rawMusicUrls.then((result) => {
    let list = []
    let rawMusicUrls = result.data
    for (let i in rawMusicUrls) {
      list.push({ url: rawMusicUrls[i].url })
    }
    return list
  })
}

export function getMusicDetail (musicId) {
  let path = '/song/detail'
  if (Array.isArray(musicId)) {
    musicId = musicId.join(',')
  }
  let params = `ids=${musicId}`
  let rawMusicList = getHttp(path, params)
  return rawMusicList.then((result) => {
    let list = []
    let rawMusicList = result.songs
    for (let i in rawMusicList) {
      list.push({ name: rawMusicList[i].name, id: rawMusicList[i].id, albumName: rawMusicList[i].al.name, albumImg: rawMusicList[i].al.picUrl, authorName: rawMusicList[i].ar[0].name })
    }
    return list
  })
}
