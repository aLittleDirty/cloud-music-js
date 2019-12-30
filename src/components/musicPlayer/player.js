import { mapGetters } from 'vuex'
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
    }
  }
}
