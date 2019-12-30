import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: 347230
  },
  getters: {
    musicId (state) {
      return state.musicId
    }
  },
  mutations: {
    setMusicId (state, newId) {
      state.musicId = newId
    }
  },
  actions: {
  },
  modules: {
  }
})
