import { getHttp, httpPost } from '../util/http-util'
// import { localGet } from '../util/repository'

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

export function getLyric (musicId) {
  let path = '/lyric'
  let params = `id=${musicId}`
  let lyric = getHttp(path, params)
  return lyric.then((result) => {
    return result.lrc.lyric
  })
}

export function getMusicMessageList (musicIds) {
  musicIds = musicIds.join(',')
  let musicDetails = getMusicDetail(musicIds)
  let musicUrls = getMusicUrl(musicIds)
  return mergeMessage(musicDetails, musicUrls)
}

export function getMusicMessage (musicId) {
  // if (!Array.isArray(musicId) && localGet(musicId)) {
  //   let a = localGet(musicId)
  //   return new Promise(a)
  // }

  let musicDetail = getMusicDetail(musicId)
  let musicUrl = getMusicUrl(musicId)
  return mergeMessage(musicDetail, musicUrl).then((result) => {
    return result[0]
  })
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

export function postUserMessage (userPhone, passWord) {
  if (userPhone && passWord) {
    let path = '/login/cellphone'
    let params = `phone=${userPhone}&password=${passWord}`
    return httpPost(path, params).then((result) => {
      return { userName: result.profile.nickname, userIcon: result.profile.avatarUrl }
    })
  }
}

export function getLogStatus () {
  let path = '/login/status'
  let params = `timestamp=${Date.now()}`
  return getHttp(path, params).then((result) => {
    if (result.code === 200) {
      return {
        isLogin: true,
        userName: result.profile.nickname,
        userIcon: result.profile.avatarUrl
      }
    }

    return {
      isLogin: false
    }
  })
}

export function postLogout () {
  httpPost('/logout')
}

export function getBanner () {
  return getHttp('/banner').then((result) => {
    let banners = []
    for (let i = 0; i < result.banners.length; i++) {
      let imageUrl = result.banners[i].imageUrl
      banners.push(imageUrl)
    }
    return banners
  })
}
