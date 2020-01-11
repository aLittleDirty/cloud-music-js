import { getMusicIds, getMusicMessageList } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
import { formatSeconds } from '../../util/second-format.js'
import { promiseReadAll, addIndexedDBStore } from '../../util/repository.js'
export default {
  name: 'musicList',
  data () {
    return {
      message: 'musicList',
      musicList: [],
      loading: true
    }
  },
  methods: {
    setMusicId (id) {
      this.$store.commit('setMusicId', id)
    }
  },
  created () {
    let billboardId = this.$route.query.id
    promiseReadAll('cloud-music', billboardId).then((musicList) => {
      this.musicList = musicList
    }, () => {
      let musicMessageList = getMusicIds(billboardId).then((musicIds) => {
        this.$store.commit('setMusicIds', musicIds)
        return getMusicMessageList(musicIds)
      })
      musicMessageList.then((messages) => {
        let promiseUrls = []
        for (let i = 0; i < messages.length; i++) {
          let message = messages[i]
          let music = new Music(message)
          let album = new Album(message)
          let singer = new Singer(message)
          let musicDetail = {
            name: music.name,
            id: music.id,
            url: music.url,
            singer: singer.name,
            albumName: album.name,
            duration: 'loading...',
            absenceUrl: false
          }
          this.musicList.push(musicDetail)
          // 获取异步返回的duration数据，并将完整的音乐信息存储到数据库表中
          let urlPromise = new Promise((resolve, reject) => {
            if (music.url) {
              let audio = new Audio(music.url)
              audio.oncanplay = function () {
                musicDetail.duration = formatSeconds(audio.duration)
                resolve(formatSeconds(audio.duration))
              }
            } else {
              musicDetail.duration = '-- : --'
              musicDetail.absenceUrl = true
              reject(new Error('no duration with null musicUrl'))
            }
          })
          promiseUrls.push(urlPromise)
        }
        Promise.all(promiseUrls).then((result) => {
          for (let i = 0; i < result.length; i++) {
            messages[i].duration = result[i]
            addIndexedDBStore('cloud-music', billboardId, messages[i])
          }
        })
      })
    })
    this.loading = false
  }
}
