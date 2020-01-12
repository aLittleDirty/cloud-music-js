import { getLyric, getMusicMessage } from '../../api/music-api.js'
import { Album } from '../../model/album.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import Lyric from 'lyric-parser'
import Bscroll from 'better-scroll'
import { mapGetters } from 'vuex'
import { promiseRead } from '../../util/repository.js'

export default {
  name: 'lyric',
  data () {
    return {
      albumImg: '',
      albumName: '',
      musicName: '',
      singer: '',
      lyric: null,
      currentLine: 0,
      scroll: null,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['musicId', 'playing', 'resetTime'])
  },
  watch: {
    musicId (newId, oldId) {
      this.changeLyric(newId)
    },
    playing (newPlaying, oldPlaying) {
      newPlaying ? this.lyric.play() : this.lyric.stop()
    },
    resetTime (newTime) {
      this.changeCurrentLine(newTime)
    }
  },
  methods: {
    changeLyric (musicId, callBack) {
      let objectStoreId = this.$store.state.billboardId
      promiseRead('cloud-music', objectStoreId, musicId).then((result) => {
        this.setMusicMessage(result)
      }, () => {
        getMusicMessage(musicId).then((message) => {
          this.setMusicMessage(message)
        })
      })
      getLyric(musicId).then((result) => {
        this.lyric = new Lyric(result, this.handleLyric)
      }).then(() => {
        callBack && callBack()
      })
    },
    handleLyric (obj) {
      // 歌词高亮
      this.currentLine = obj.lineNum
      // 歌词滚动
      let wrapperHeight = this.$refs.wrapper.clientHeight
      let contentHeight = this.$refs.content.scrollHeight
      let lyricLines = this.lyric.lines.length
      let lineHeight = contentHeight / lyricLines
      // 1是误差值
      let contentScrollTop = (lineHeight * this.currentLine) - (wrapperHeight / 2) - 1
      if ((contentScrollTop > 0) && (contentScrollTop + wrapperHeight < contentHeight)) {
        this.scroll.scrollTo(0, -contentScrollTop, 1000)
      }
      if (contentScrollTop < 0) {
        this.scroll.scrollTo(0, 0, 1000)
      }
    },
    setMusicMessage (message) {
      let music = new Music(message)
      let album = new Album(message)
      let singer = new Singer(message)
      this.musicName = music.name
      this.albumName = album.name
      this.albumImg = album.image
      this.singer = singer.name
    },
    changeCurrentLine (time) {
      this.lyric.seek(time * 1000)
      let playing = this.$store.state.playing
      !playing && this.lyric.stop()
    }
  },
  mounted () {
    let musicId = this.$store.state.musicId
    this.changeLyric(musicId, () => {
      this.loading = false
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, { scrollY: true })
        let time = this.$store.state.initTime
        this.changeCurrentLine(time)
      })
    })
  }
}
