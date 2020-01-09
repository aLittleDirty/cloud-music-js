import { mapGetters } from 'vuex'
import { getMusicMessage } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { formatSeconds } from '../../util/second-format.js'
import { Album } from '../../model/album.js'
export default {
  name: 'musicPlayer',
  data () {
    return {
      musicName: '',
      singer: '',
      currentTime: 0,
      duration: 0,
      imageUrl: '',
      playing: false,
      musicUrl: '',
      currentMusicId: 0,
      absenceNext: false,
      absencePrev: false
    }
  },
  filters: {
    formatSeconds
  },
  computed: {
    ...mapGetters(['musicId'])
  },
  watch: {
    musicId (newId, oldId) {
      this.currentMusicId = newId
      this.playing = false
      this.setControllerStyle()
      this.$store.commit('setPlaying', this.playing)
      this.refreshMusic(newId).then(() => {
        let _this = this
        this.$refs.audio.oncanplay = function () {
          _this.playing = true
          _this.$store.commit('setPlaying', _this.playing)
        }
      })
    },
    playing (newValue, oldValue) {
      this.broadcast(newValue)
    },
    currentTime (newCurrentTime) {
    // 设置播放进度条的滑块位置及进度条颜色
      if (this.duration !== 0) {
        let result = (newCurrentTime / this.duration).toFixed(2) * 100
        this.$refs.progress.value = result
        this.$refs.progress.style.backgroundSize = `${result}%100%`
      }
    }
  },
  methods: {
    refreshMusic (newId) {
      // 更新音乐信息
      let musicMessage = getMusicMessage(newId)
      return musicMessage.then((message) => {
        let music = new Music(message)
        let singer = new Singer(message)
        let album = new Album(message)
        this.musicName = music.name
        // 异步加载新的musicUrl，并更新DOM元素
        this.musicUrl = music.url
        this.singer = singer.name
        // 异步获取专辑封面图
        this.imageUrl = album.image
      })
    },
    changeVolume (event) {
      this.$refs.audio.volume = event.target.value / 10
      // 设置滑动条的背景颜色
      this.$refs.volume.style.backgroundSize = `${event.target.value * 10}%100%`
    },
    swap () {
      this.playing = !this.playing
      this.$store.commit('setPlaying', this.playing)
    },
    next () {
      let musicList = this.$store.state.musicIds
      let index = musicList.findIndex((value) => {
        return value === this.currentMusicId
      })
      index++
      if (index > musicList.length) {
        return
      }
      let currentMusicId = musicList[index]
      this.$store.commit('setMusicId', currentMusicId)
    },
    prev () {
      let musicList = this.$store.state.musicIds
      let index = musicList.findIndex((value) => {
        return value === this.currentMusicId
      })
      index--
      if (index < 0) {
        return
      }
      let currentMusicId = musicList[index]
      this.$store.commit('setMusicId', currentMusicId)
    },
    setStatus (isPlay) {
      this.playing = isPlay
    },
    broadcast (isPlaying) {
      isPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    resetProgress (event) {
      let time = (event.target.value / 100) * this.duration
      this.currentTime = time
      this.$refs.audio.currentTime = time
    },
    setControllerStyle () {
      let musicList = this.$store.state.musicIds
      if (musicList.length === 0 || !musicList.includes(this.currentMusicId)) {
        this.absenceNext = true
        this.absencePrev = true
      } else {
        let index = musicList.findIndex((value) => { return value === this.currentMusicId })
        this.absencePrev = (index === 0)
        this.absenceNext = (index === musicList.length)
      }
    },
    updateTime (event) {
      this.currentTime = event.target.currentTime
    },
    setDuration () {
      this.duration = this.$refs.audio.duration
    }
  },
  created () {
    let id = this.$store.state.musicId
    this.refreshMusic(id)
  },
  mounted () {
    this.setControllerStyle()
  }
}
