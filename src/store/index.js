import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import customAxios from "@/customAxios/customAxios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    results: []
  },
  mutations: { //synchronous
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setData(state, payload) {
      state.results = payload
    }
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
    },
    async getAllData(state) {
      console.log('Store getAllData is called')
      await customAxios.get('/coffee/all').then((response) => {
        if (response) {
          state.commit("setData", response.data)
        }
      }).catch((e) => {
        console.log('Store getAllData Error')
        console.log(e)
      })
    }
  },
  modules: {
  },
  getters: {
    getLoggedIn(state) {
      return state.isLoggedIn
    },
    getAllData(state) {
      return state.results
    }
  }
})
