import { getPersonalRadio } from '../../api/music-api'

export default {
  name: 'personal-main-collection',
  data () {
    return {
      radioCount: 0,
      radios: []
    }
  },
  beforeRouteEnter (to, from, next) {
    let url = to.params.url
    getPersonalRadio(url).then((data) => {
      next(vm => {
        let { radioCount, radios } = data
        vm.radioCount = radioCount
        vm.radios = radios
        let { radioName, radioImg, radioId, djName } = data
        vm.radioName = radioName
        vm.radioImg = radioImg
        vm.radioId = radioId
        vm.djName = djName
      })
    })
  }
}
