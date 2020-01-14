import { Billboard } from '../../model/billboard.js'
import { getBillboard } from '../../api/music-api.js'
import { localGet, localSet, initDataBase } from '../../util/repository.js'
import Paging from '../paging/index.vue'
export default {
  name: 'billboard',
  components: {
    Paging
  },
  data () {
    return {
      lists: [],
      loading: true,
      pagesNum: 5,
      currentPage: 0
    }
  },
  watch: {
    currentPage () {
      this.getData()
    }
  },
  methods: {
    gotoPage (num) {
      this.currentPage = num
    },
    showList (totalLists) {
      let range = totalLists.length / this.pagesNum
      let start = this.currentPage * range
      return totalLists.splice(start, range)
    },
    getData () {
      let billboardLists = localGet('billboardLists')
      if (billboardLists) {
        this.lists = this.showList(billboardLists)
      } else {
        getBillboard().then((billboardList) => {
          let lists = []
          let storeIdList = []
          let appearLists = this.showLists(billboardLists)
          for (let i = 0; i < appearLists.length; i++) {
            let billboard = new Billboard(billboardList[i])
            lists.push(billboard)
            storeIdList.push(billboard.id)
          }
          localSet('billboardLists', lists)
          this.lists = lists
          // 创建数据库
          initDataBase('cloud-music', storeIdList, 'id', 'page')
        })
      }
      this.loading = false
    }
  },
  created () {
    this.getData()
  }
}
