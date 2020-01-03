import { getLyric, getMusicMessage } from '../../api/music-api.js'
import { Album } from '../../model/album.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import Lyric from 'lyric-parser'
import Bscroll from 'better-scroll'
import { mapGetters } from 'vuex'

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
      newPlaying ? this.lyric.play() : this.lyric.stop()
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
      let contentScrollTop = this.$refs.content.scrollTop
      let movement = contentScrollTop - wrapperHeight / 2
      if (movement && (contentScrollTop + wrapperHeight < contentHeight)) {
        this.scroll.scrollTo(0, movement, 1000)
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
  }
}
