import { getMusicMessage } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
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
        console.table(musicMessage[i])
        let message = musicMessage[i]
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        this.musicList.push({
          name: music.name,
          id: music.id,
          singer: singer.name,
          albumName: album.name,
          albumImg: album.image,
          duration: '-- : --'
        })
        let audio = new Audio(music.url)
        // audio.oncanplay异步加载了audio的资源...
        audio.oncanplay = function () {
          // 将audio.duration转换成分秒数据并赋值
          console.log(audio.duration)
        }
      }
    })
  }
}
