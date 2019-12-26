import { getHttp } from '../util/http-util'

export function getBillboard () {
  let url = '/toplist'
  let params = ''
  return getHttp(url, params, (rawData) => {
    let list = []
    for (let i = 0; i < rawData.list.length; i++) {
      list.push({ name: rawData.list[i].name, coverImg: rawData.list[i].coverImgUrl, id: rawData.list[i].id })
    }
    return list
  }, (err) => {
    console.log(err)
  })
}

export function getLyric (musicId) {
  let url = '/lyric'
  let params = `id=${musicId}`
  return getHttp(url, params, (rawData) => {
    let lyric = rawData.lrc.lyric
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
      let musicMessage = Object.assign(musicLists[i], { url: musicUrls[i] })
      musicMessages.push(musicMessage)
    }
    return musicMessages
  })
}

function getMusicIds (billBoardId) {
  let url = '/playlist/detail'
  let params = `id=${billBoardId.toString()}`
  return getHttp(url, params, (rawData) => {
    let list = []
    let dataList = rawData.playlist.tracks
    for (let i = 0; i < dataList.length; i++) {
      list.push(dataList[i].id)
    }
    return list
  }, (err) => {
    console.log(err)
  })
}

function getMusicURLs (musicIds) {
  let url = '/song/url'
  let params = `id=${musicIds.join(',')}`
  return getHttp(url, params, (rawData) => {
    let list = []
    for (let i = 0; i < rawData.data.length; i++) {
      list.push(rawData.data[i].url)
    }
    return list
  }, (err) => {
    console.log(err)
  })
}

function getMusicList (musicIds) {
  let url = '/song/detail'
  let params = `ids=${musicIds.join(',')}`
  return getHttp(url, params, (rawData) => {
    let list = []
    let songs = rawData.songs
    for (let i = 0; i < songs.length; i++) {
      list.push({ name: songs[i].name, id: songs[i].id, author: songs[i].ar[0].name, albumName: songs[i].al.name, albumImg: songs[i].al.picUrl })
    }
    return list
  }, (err) => {
    console.log(err)
  })
}
