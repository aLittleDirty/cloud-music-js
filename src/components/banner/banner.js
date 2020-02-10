import { getBanner } from '../../api/music-api'

export default {
  name: 'Banner',
  data () {
    return {
      pages: [],
      currentPage: 0,
      player: null
    }
  },
  methods: {
    toPage (index) {
      this.currentPage = index
    }
  },
  mounted () {
    getBanner().then((banners) => {
      this.pages = banners
      this.player = setInterval(() => {
        this.currentPage = this.currentPage < 7 ? this.currentPage + 1 : 0
      }, 1000)
    })
  },
  beforeDestroy () {
    clearInterval(this.player)
  }
}
