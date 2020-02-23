import { getLogStatus, postUserMessage, postLogout } from '../../api/music-api.js'
import { localSet, localRemove } from '../../util/repository.js'
export default {
  name: 'login',
  data () {
    return {
      userIcon: '',
      userName: '',
      userPhone: '',
      passWord: '',
      showDialog: false,
      isLogin: false
    }
  },
  methods: {
    login (userPhone, passWord) {
      postUserMessage(userPhone, passWord).then((user) => {
        this.userIcon = user.userIcon
        this.userName = user.userName
        this.isLogin = true
        this.showDialog = false
        localSet('userId', user.userId)
      })
    },
    logout () {
      postLogout()
      this.isLogin = false
      localRemove('userId')
    }
  },
  mounted () {
    getLogStatus().then((user) => {
      this.isLogin = user.isLogin
      if (user.isLogin) {
        this.userName = user.userName
        this.userIcon = user.userIcon
      }
    })
  }
}
