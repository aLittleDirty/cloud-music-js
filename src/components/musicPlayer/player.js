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
      this.currentTime = 0
      this.decoratePrevNext()
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
      this.toPlay(newValue)
    },
    currentTime (newCurrentTime) {
    // 设置播放进度条的滑块位置及播放进度条颜色
      if (this.duration !== 0) {
        let result = (newCurrentTime / this.duration).toFixed(2) * 100
        this.$refs.progress.value = result
        this.$refs.progress.style.backgroundSize = `${result}%100%`
      }
    }
  },
  methods: {
    refreshMusic (newId) {
      // 要获取当前播放的音乐所在的音乐列表id: musicListId
      // 使用read('cloud-music', musicListId, newId)
      // 判断数据库中国有无该数据列表，没有则异步请求
      // 更新音乐信息
      let musicMessage = getMusicMessage(newId)
      return musicMessage.then((message) => {
        let music = new Music(message)
        let singer = new Singer(message)
        let album = new Album(message)
        this.musicName = music.name
        this.musicUrl = music.url
        this.singer = singer.name
        this.imageUrl = album.image
      })
    },
    changeVolume (event) {
    // 改变音量大小，设置音量控制条样式
      this.$refs.audio.volume = event.target.value / 10
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
    toPlay (isPlaying) {
      isPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    resetProgress (event) {
      this.$refs.audio.pause()
      let time = (event.target.value / 100) * this.duration
      this.currentTime = time
      this.$refs.audio.currentTime = time
      this.$store.commit('setMusicTime', time)
      let _this = this
      this.$refs.audio.oncanplay = function () {
        _this.$refs.audio.play()
        _this.$store.commit('setPlaying', true)
      }
    },
    decoratePrevNext () {
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
      let time = event.target.currentTime
      this.currentTime = time
      this.$store.commit('setMusicTime', time)
    },
    initDuration (event) {
      this.duration = event.target.duration
    }
  },
  created () {
    let id = this.$store.state.musicId
    this.refreshMusic(id)
  },
  mounted () {
    this.decoratePrevNext()
  }
}
