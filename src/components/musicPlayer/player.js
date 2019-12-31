import { mapGetters } from 'vuex'
import { getMusicList, getMusicURLs } from '../../api/music-api.js'
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
      musicUrl: ''
    }
  },
  computed: {
    ...mapGetters(['musicId'])
  },
  watch: {
    musicId (newId, oldId) {
      this.refreshMusic(newId)
    }
  },
  methods: {
    refreshMusic (newId) {
      // 更新音乐信息
      let musicMessage = getMusicList(newId.toString())
      let musicUrl = getMusicURLs(newId.toString())
      musicMessage.then((result) => {
        let message = result[0]
        let music = new Music(message)
        let singer = new Singer(message)
        let album = new Album(message)
        this.musicName = music.name
        this.singer = singer.name
        this.imageUrl = album.image
      })
      musicUrl.then((result) => {
        // 应该从music实例中获取
        let musicUrl = result[0].url
        this.musicUrl = musicUrl
      })
    },
    setCurrentTime () {
      this.currentTime = formatSeconds(this.$refs.audio.currentTime)
    },
    setDuration () {
      this.duration = formatSeconds(this.$refs.audio.duration)
    }
  },
  created () {
    let id = this.$store.state.musicId
    this.refreshMusic(id)
  }
}
