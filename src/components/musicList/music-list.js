import { getMusicIds, getMusicMessageList } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { Album } from '../../model/album.js'
import { formatSeconds } from '../../util/second-format.js'
import { add } from '../../util/repository.js'
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
    // 在这里添加readAll('cloud-music', billboardId)，判断是否存在，如果不存在此数据库表，那么，就异步请求
    // 获取这些数据之后，依然要for循环异步请求总时长
    let musicMessageList = getMusicIds(billboardId).then((musicIds) => {
      this.$store.commit('setMusicIds', musicIds)
      return getMusicMessageList(musicIds)
    })
    musicMessageList.then((messages) => {
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
        add('cloud-music', billboardId, musicDetail)
      }
      // 处理每一首歌异步加载的duration
      for (let i = 0; i < this.musicList.length; i++) {
        let url = this.musicList[i].url
        if (!url) {
          this.musicList[i].duration = '-- : --'
          this.musicList[i].absenceUrl = true
          continue
        }
        let audio = new Audio(url)
        let _this = this
        // audio.oncanplay异步加载了audio.duration
        audio.oncanplay = function () {
          _this.musicList[i].duration = formatSeconds(audio.duration)
        }
      }
      this.loading = false
    })
  }
}
