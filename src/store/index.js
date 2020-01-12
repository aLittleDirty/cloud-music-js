import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: 347230,
    billboardId: 0,
    musicIds: [],
    playing: false,
    initTime: 0,
    resetTime: 0
  },
  getters: {
    musicId (state) {
      return state.musicId
    },
    playing (state) {
      return state.playing
    },
    resetTime (state) {
      return state.resetTime
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
      state.initTime = newTime
    },
    setBillboardId (state, newBillboardId) {
      state.billboardId = newBillboardId
    },
    setResetTime (state, newTime) {
      state.resetTime = newTime
    }
  },
  actions: {
  },
  modules: {
  }
})
