import { getMusicMessage } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
import { formatSeconds } from '../../util/second-format.js'
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
    getMusicMessage(billboardId).then((musicMessage) => {
      for (let i = 0; i < musicMessage.length; i++) {
        let message = musicMessage[i]
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        this.musicList.push({
          name: music.name,
          id: music.id,
          singer: singer.name,
          albumName: album.name,
          duration: 'loading...',
          musicUrl: music.url
        })
      }
      for (let i = 0; i < this.musicList.length; i++) {
        let url = this.musicList[i].musicUrl
        let audio = new Audio(url)
        let _this = this
        // audio.oncanplay异步加载了audio.duration
        audio.oncanplay = function () {
          if (audio.duration) {
            _this.musicList[i].duration = formatSeconds(audio.duration)
          } else {
            _this.musicList[i].duration = '-- : --'
          }
        }
      }
    })
  }
}
