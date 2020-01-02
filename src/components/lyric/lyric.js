import { getLyric, getMusicMessage } from '../../api/music-api.js'
import { Album } from '../../model/album.js'
import { Music } from '../../model/music.js'
import { Singer } from '../../model/singer.js'
import Lyric from 'lyric-parser'
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
      currentLine: 0
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
      console.log(newPlaying)
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
      getLyric(musicId).then((result) => {
        this.lyric = new Lyric(result, this.handleLyric)
      })
    },
    handleLyric (obj) {
      this.currentLine = obj.lineNum
    }
  },
  created () {
    let musicId = this.$store.state.musicId
    this.changeLyric(musicId)
  }
}

/*
事情:
2. 歌词滚动: toScroll接口滚动歌词(清楚滚动到哪一行)
    歌词暂停和滚动由music-player中的playing控制，用vuex来管理吧
*/
