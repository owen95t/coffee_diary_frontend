import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import customAxios from "@/customAxios/customAxios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    results: [],
    post: {},
  },
  mutations: { //synchronous
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setData(state, payload) {
      state.results = payload
    },
    setPost(state, payload){
      state.post = payload
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
          let formattedResults = response.data
          for(let i = 0; i < formattedResults.length; i++){
            let day = new Date(formattedResults[i].date)
            formattedResults[i].date = day.toLocaleString('en-CA', {dateStyle: 'medium'})
          }
          state.commit("setData", formattedResults)
        }
      }).catch((e) => {
        console.log('Store getAllData Error')
        console.log(e)
      })
    },
    async postEntry({getters, dispatch}) {
      const post = getters['getPost']
      let response;
      try{
        response = await customAxios.post('coffee/new', post)
        if (response) {
          alert('New Entry Success')
          dispatch('getAllData')
          return response
        }
      }catch (e) {
        console.log(e)
      }
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
    },
    getPost(state){
      return state.post
    }
  }
})
