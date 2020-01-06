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
      currentTime: '00 : 00',
      duration: '',
      imageUrl: '',
      playing: false,
      musicUrl: '',
      currentMusicId: 0
    }
  },
  computed: {
    ...mapGetters(['musicId'])
  },
  watch: {
    musicId (newId, oldId) {
      this.currentMusicId = newId
      this.playing = false
      this.$store.commit('setPlaying', this.playing)
      this.refreshMusic(newId).then(() => {
        let _this = this
        this.$refs.audio.oncanplay = function () {
          _this.playing = true
          this.$store.commit('setPlaying', this.playing)
        }
      })
    },
    playing (newValue, oldValue) {
      this.broadcast(newValue)
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
      let index = musicList.findIndex(this.currentMusicId)
      index++
      let currentMusicId = musicList[index]
      this.$store.commit('setMusicId', currentMusicId)
    },
    prev () {
      let musicList = this.$store.state.musicIds
      let index = musicList.findIndex(this.currentMusicId)
      index--
      let currentMusicId = musicList[index]
      this.$store.commit('setMusicId', currentMusicId)
    },
    setStatus (isPlay) {
      this.playing = isPlay
    },
    broadcast (isPlaying) {
      isPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    setCurrentTime () {
      this.currentTime = formatSeconds(this.$refs.audio.currentTime)
      // 设置滑动条的背景颜色
      this.$refs.progress.style.backgroundSize = `${parseInt(this.$refs.audio.currentTime / this.$refs.audio.duration)}100%`
    },
    setDuration () {
      this.duration = formatSeconds(this.$refs.audio.duration)
    }
  },
  created () {
    let id = this.$store.state.musicId
    this.refreshMusic(id)
  },
  mounted () {
    this.$refs.progress.css('background-size', this.value + '%100%')
  }
}
