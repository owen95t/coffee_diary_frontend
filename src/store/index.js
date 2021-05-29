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
    csrfToken: '',
    user: {
      email: '',
      password: ''
    }
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
    },
    setCSRFToken(state, payload){
      state.csrfToken = payload
    },
    setUser(state, payload){
      state.user = payload
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
    async getAllData({getters, commit}) {
      console.log('Store getAllData is called')
      const cToken = getters['getToken']
      await customAxios.get('/coffee/all').then((response) => {
        if (response) {
          let formattedResults = response.data
          for(let i = 0; i < formattedResults.length; i++){
            let day = new Date(formattedResults[i].date)
            formattedResults[i].date = day.toLocaleString('en-CA', {dateStyle: 'medium'})
          }
          commit("setData", formattedResults)
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
    },
    async userLogin({getters, dispatch}){
      let user = getters['getUser']
      let response;
      try{
        response = await customAxios.post('user/login', user)
        if (response.status == 200) {
          alert('Log in success! Taking you to your dashboard...')
          await dispatch("setLoggedIn", true)
          await router.push('/dashboard')
        }
      }catch (e) {
        console.log('Login error: ' + e)
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
    },
    getToken(state){
      return state.csrfToken
    },
    getUser(state){
      return state.user
    }
  }
})
