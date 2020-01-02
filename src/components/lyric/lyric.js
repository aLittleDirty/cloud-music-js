// import { getLyric } from '../../api/music-api.js'
// import { Lyric } from '../../model/lyric.js'

export default {
  name: 'lyric',
  data () {
    return {
      message: 'lyric'
      // lyric: null
    }
  }
  // created () {
  //   let musicId = this.$store.state.musicId
  //   getLyric(musicId).then((result) => {
  //     this.lyric = new Lyric(result)
  //   })
  // }
}
