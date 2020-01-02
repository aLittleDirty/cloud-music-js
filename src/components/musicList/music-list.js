import { getMusicMessage, getMusicIds } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
import { formatSeconds } from '../../util/second-format.js'
import { localSet } from '../../util/repository.js'
export default {
  name: 'musicList',
  data () {
    return {
      message: 'musicList',
      musicList: []
    }
  },
  methods: {
    setMusicId (id) {
      this.$store.commit('setMusicId', id)
    }
  },
  created () {
    let billboardId = this.$route.query.id
    let musicMessage = getMusicIds(billboardId).then((musicIds) => {
      return getMusicMessage(musicIds)
    })
    musicMessage.then((messages) => {
      for (let i = 0; i < messages.length; i++) {
        let message = messages[i]
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        this.musicList.push({
          name: music.name,
          id: music.id,
          url: music.url,
          singer: singer.name,
          albumName: album.name,
          duration: 'loading...'
        })
        // 将音乐数据储存到localStorage中
        let key = message.id
        localSet(key, message)
      }
      // 处理每一首歌异步加载的duration
      for (let i = 0; i < this.musicList.length; i++) {
        let url = this.musicList[i].url
        if (!url) {
          this.musicList[i].duration = '-- : --'
          continue
        }
        let audio = new Audio(url)
        let _this = this
        // audio.oncanplay异步加载了audio.duration
        audio.oncanplay = function () {
          _this.musicList[i].duration = formatSeconds(audio.duration)
        }
      }
    })
  }
}
