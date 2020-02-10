import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
