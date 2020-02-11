import Login from '../login/index.vue'
export default {
  name: 'Header',
  data () {
    return {
      currentPage: '排行榜',
      focusOption: 1
    }
  },
  components: {
    Login
  },
  // 导航栏信息发生改变
  mounted () {
    let _this = this
    this.$router.afterEach((to, from) => {
      _this.currentPage = to.meta.title || ''
    })
  }
}
