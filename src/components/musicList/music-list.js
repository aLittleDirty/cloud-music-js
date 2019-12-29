import { getMusicMessage } from '../../api/music-api.js'
export default {
  name: 'musicList',
  data () {
    return {
      message: 'musicList'
    }
  },
  created () {
    // 传入billboardId参数
    let billboardId = this.$route.params.id
    getMusicMessage(billboardId).then((musicMessage) => {
      console.log(musicMessage)
      for (let i = 0; i < musicMessage.length; i++) {
        console.log(musicMessage[i])
      }
    })
  }
}
