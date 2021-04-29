import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: { //synchronous
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
  },
  actions: { //asynchronous
    setLoggedIn(state, payload) {
      if (payload) {
        console.log('State action setLoggedin is true')
        router.push('dashboard')
      }
      if (!payload) {
        console.log("State action setLoggedIn is false")
        router.push('/login')
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
