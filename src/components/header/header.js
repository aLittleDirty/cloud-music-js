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
  }
}
