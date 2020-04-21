import { getPersonalSigner } from '../../api/music-api'

export default {
  data () {
    return {
      singersCount: 0,
      signers: []
    }
  },
  async beforeRouteEnter (to, from, next) {
    let { singersCount, signers } = await getPersonalSigner(to.params.url)
    next(vm => {
      vm.singersCount = singersCount
      vm.signers = signers
    })
  }
}
