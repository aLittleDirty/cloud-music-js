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
    ...mapGetters(['musicId', 'playing', 'musicTime'])
  },
  watch: {
    musicId (newId, oldId) {
      this.changeLyric(newId)
    },
    playing (newPlaying, oldPlaying) {
      newPlaying ? this.lyric.play() : this.lyric.stop()
    },
    // 监听因歌曲拖动而改变的播放时间
    musicTime (newTime) {
      this.lyric.seek(newTime)
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
  created () {
    let musicId = this.$store.state.musicId
    this.changeLyric(musicId).then(() => {
      this.loading = false
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, { scrollY: true })
      })
    })
  },
  mounted () {
    // 获取当前歌曲播放的时间,滚动到对应的歌词行
    let time = this.$store.state.lyricInitTime
    this.lyric.seek(time)
  }
}
