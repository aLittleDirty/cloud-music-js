import Vue from 'vue'
import VueRouter from 'vue-router'
import Billboard from '../components/billboard/index.vue'
import MusicList from '../components/musicList/index.vue'
import Lyric from '../components/lyric/index.vue'
import Personal from '../components/personal/index.vue'
import PersonalRadio from '../components/personal-main-radio/index.vue'
import PersonalSinger from '../components/personal-main-singer/index.vue'
import PersonalPlaylist from '../components/personal-main-playlist/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/billboard',
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
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
    children: [
      {
        path: '/personal-main-radio',
        name: 'personal-main-radio',
        component: PersonalRadio
      },
      {
        path: '/personal-main-singer',
        name: 'personal-main-singer',
        component: PersonalSinger
      },
      {
        path: '/personal-main-playlist',
        name: 'personal-main-playlist',
        component: PersonalPlaylist
      }
    ]
  },
  {
    path: '/',
    redirect: { name: 'billboard' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
