import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: 347230,
    musicIds: [],
    playing: false,
    lyricInitTime: 0
  },
  getters: {
    musicId (state) {
      return state.musicId
    },
    playing (state) {
      return state.playing
    }
  },
  mutations: {
    setMusicId (state, newId) {
      state.musicId = newId
    },
    setMusicIds (state, newIds) {
      state.musicIds = newIds
    },
    setPlaying (state, newPlaying) {
      state.playing = newPlaying
    },
    setLyricInitTime (state, newTime) {
      state.lyricInitTime = newTime
    }
  },
  actions: {
  },
  modules: {
  }
})
