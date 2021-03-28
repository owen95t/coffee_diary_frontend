import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: { //synchronous
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    }
  },
  actions: { //asynchronous
    setLoggedIn(state, payload) {
      if (payload) {
        console.log('State action setLoggedin is true')
      }
      if (!payload) {
        console.log("State action setLoggedIn is false")
      }
      state.commit("setLoggedIn", payload);
    }
  },
  modules: {
  },
  getters: {
    getLoggedIn(state) {
      return state.isLoggedIn
    }
  }
})
