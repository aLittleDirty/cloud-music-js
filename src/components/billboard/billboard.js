import { Billboard } from '../../model/billboard.js'
import { getBillboard } from '../../api/music-api.js'
export default {
  name: 'billboard',
  data () {
    return {
      lists: [],
      loading: true
    }
  },
  created () {
    getBillboard().then((billboardList) => {
      for (let i = 0; i < billboardList.length; i++) {
        let billboard = new Billboard(billboardList[i])
        this.lists.push(billboard)
      }
      this.loading = false
    })
  }
}
