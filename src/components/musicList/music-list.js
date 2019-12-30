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
  created () {
    let billboardId = this.$route.params.id
    getMusicMessage(billboardId).then((musicMessage) => {
      for (let i = 0; i < musicMessage.length; i++) {
        let message = musicMessage[i]
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        let audio = new Audio(music.url)
        let duration = 'loading...'
        // audio.oncanplay异步加载了audio的资源
        audio.oncanplay = () => {
          if (audio.duration) {
            duration = formatSeconds(audio.duration)
          } else {
            duration = '-- : --'
          }
        }
        this.musicList.push({
          name: music.name,
          singer: singer.name,
          albumName: album.name,
          duration: duration
        })
      }
    })
    console.log(this.musicList)
  }
}
