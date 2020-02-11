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
    meta: { title: '排行榜' }
  },
  {
    path: '/musicList',
    name: 'musicList',
    component: MusicList,
    meta: { title: '音乐列表' }
  },
  {
    path: '/Lyric',
    name: 'lyric',
    component: Lyric,
    meta: { title: '歌词' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
