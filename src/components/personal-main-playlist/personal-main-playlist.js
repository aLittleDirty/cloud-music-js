import MusicList from '../musicList'
export default {
  name: 'personal-main-playlist',
  data () {
    return {
    }
  },
  components: {
    MusicList
  }
  // beforeRouteEnter (to, from, next) {
  //   getMusicIds(to.params.id)
  //   next(vm => {
  //     vm.id = to.params.id
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.id = to.params.id
  // }
}
