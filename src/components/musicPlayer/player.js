import { mapGetters } from 'vuex'
import { getMusicMessage } from '../../api/music-api.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import { formatSeconds, formatValidTime } from '../../util/second-format.js'
import { Album } from '../../model/album.js'
import { promiseRead } from '../../util/repository.js'
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
      absencePrev: false,
      isLock: true
    }
  },
  filters: {
    formatSeconds,
    formatValidTime
  },
  computed: {
    ...mapGetters(['musicId'])
  },
  watch: {
    musicId (newId, oldId) {
      this.currentMusicId = newId
      this.currentTime = 0
      this.refreshMusic(newId)
      this.playing = false
      this.$store.commit('setPlaying', this.playing)
      let _this = this
      this.$refs.audio.oncanplay = function () {
        _this.playing = true
        _this.$store.commit('setPlaying', _this.playing)
      }
      this.decoratePrevNext()
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
      let objectStoreId = this.$store.state.billboardId
      promiseRead('cloud-music', objectStoreId, newId).then((result) => {
        this.initMusicMessage(result)
      }, () => {
        getMusicMessage(newId).then((message) => {
          this.initMusicMessage(message)
        })
      })
    },
    initMusicMessage (message) {
      let music = new Music(message)
      let singer = new Singer(message)
      let album = new Album(message)
      this.musicName = music.name
      this.musicUrl = music.url
      this.singer = singer.name
      this.imageUrl = album.image
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
      let time = (event.target.value / 100) * this.duration
      this.currentTime = time
      this.$refs.audio.currentTime = time
      this.$store.commit('setResetTime', time)
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
      this.$store.commit('setLyricInitTime', time)
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
