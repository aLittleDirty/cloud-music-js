import { mapGetters } from 'vuex'
import { getMusicList, getMusicURLs } from '../../api/music-api.js'
export default {
  name: 'musicPlayer',
  data () {
    return {
      message: this.$store.state.musicId
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
      console.log(musicMessage)
      console.log(musicUrl)
    }
  }
}
