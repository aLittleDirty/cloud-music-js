export default {
  name: 'Header',
  data () {
    return {
      currentPage: ''
    }
  },
  // 导航栏信息发生改变
  mounted () {
    let _this = this
    this.$router.afterEach((to, from) => {
      _this.currentPage = to.meta.title || ''
    })
  }
}
