import { getLogStatus, postUserMessage, postLogout } from '../../api/music-api.js'
export default {
  name: 'login',
  data () {
    return {
      userIcon: '',
      userName: '',
      userPhone: '',
      passWord: '',
      showLoginBox: false,
      isLogin: false
    }
  },
  methods: {
    login (userPhone, passWord) {
      postUserMessage(userPhone, passWord).then((user) => {
        this.userIcon = user.userIcon
        this.userName = user.userName
        this.isLogin = true
        this.showLoginBox = false
      })
    },
    logout () {
      postLogout()
      this.isLogin = false
    }
  },
  mounted () {
    getLogStatus().then((user) => {
      // 这里和预期不符啊, 每次返回的状态码都是301...
      this.isLogin = user.isLogin
      if (user.isLogin) {
        this.userName = user.nickname
        this.userIcon = user.userIcon
      }
    })
  }
}
