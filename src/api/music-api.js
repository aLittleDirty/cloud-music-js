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

export function getMusicMessage (billBoardId) {
  let musicIds = getMusicIds(billBoardId)
  return musicIds.then((result) => {
    let musicLists = getMusicList(result)
    let musicUrls = getMusicURLs(result)
    return mergeMessage(musicLists, musicUrls)
  })
}

function mergeMessage (p1, p2) {
  return Promise.all([p1, p2]).then((result) => {
    let musicLists = result[0]
    let musicUrls = result[1]
    let musicMessages = []
    for (let i in musicLists) {
      let musicMessage = Object.assign(musicLists[i], musicUrls[i])
      musicMessages.push(musicMessage)
    }
    return musicMessages
  })
}

function getMusicIds (billBoardId) {
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

function getMusicURLs (musicIds) {
  let path = '/song/url'
  let params = `id=${musicIds.join(',')}`
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

function getMusicList (musicIds) {
  let path = '/song/detail'
  let params = `ids=${musicIds.join(',')}`
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
