import { getLyric, getMusicMessage } from '../../api/music-api.js'
import { Album } from '../../model/album.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import Lyric from 'lyric-parser'
import Bscroll from 'better-scroll'
import { mapGetters } from 'vuex'
// 问题1：在creat时，如何获得musicPlayer的参数
// 问题2：在调用a组件的函数时，如何触发b组件的函数并传递参数？
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
    ...mapGetters(['musicId', 'playing'])
  },
  watch: {
    musicId (newId, oldId) {
      this.changeLyric(newId)
    },
    playing (newPlaying, oldPlaying) {
      // 获取当前歌曲播放的时间,滚动到对应的歌词行
      let time = this.$store.state.musicTime
      newPlaying ? this.lyric.seek(time) : this.lyric.stop()
    }
  },
  methods: {
    changeLyric (musicId) {
      getMusicMessage(musicId).then((message) => {
        let music = new Music(message)
        let album = new Album(message)
        let singer = new Singer(message)
        this.musicName = music.name
        this.albumName = album.name
        this.albumImg = album.image
        this.singer = singer.name
      })
      return getLyric(musicId).then((result) => {
        this.lyric = new Lyric(result, this.handleLyric)
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
    }
  },
  mounted () {
    let musicId = this.$store.state.musicId
    this.changeLyric(musicId).then(() => {
      this.loading = false
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, { scrollY: true })
        let playing = this.$store.state.playing
        if (playing) {
          let time = this.$store.state.musicTime
          this.lyric.seek(time)
        }
      })
    })
  }
}
