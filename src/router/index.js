import Vue from 'vue'
import VueRouter from 'vue-router'
import Billboard from '../components/billboard/index.vue'
import MusicList from '../components/musicList/index.vue'
import Lyric from '../components/lyric/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'billboard',
    component: Billboard,
    meta: { title: '' }
  },
  {
    path: '/musicList',
    name: 'musicList',
    component: MusicList,
    meta: { title: '/榜单详情' }
  },
  {
    path: '/Lyric',
    name: 'lyric',
    component: Lyric,
    meta: { title: '/歌曲详情' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
