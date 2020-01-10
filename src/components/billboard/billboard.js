import { Billboard } from '../../model/billboard.js'
import { getBillboard } from '../../api/music-api.js'
import { localGet, localSet, initDataBase } from '../../util/repository.js'
export default {
  name: 'billboard',
  data () {
    return {
      lists: [],
      loading: true
    }
  },
  created () {
    let billboardLists = localGet('billboardLists')
    if (billboardLists) {
      this.lists = billboardLists
    } else {
      getBillboard().then((billboardList) => {
        let lists = []
        let storeIdList = []
        for (let i = 0; i < billboardList.length; i++) {
          let billboard = new Billboard(billboardList[i])
          lists.push(billboard)
          storeIdList.push(billboard.id)
        }
        localSet('billboardLists', lists)
        this.lists = lists
        this.loading = false
        // 创建数据库
        initDataBase('cloud-music', storeIdList, 'id', 'name')
      })
    }
  }
}
