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
    },
    gettingData: false,
    submitting: false,

  },
  mutations: { //synchronous COMMIT
    setLoggedIn(state, payload) {
      console.log('Commit set logged in: ' + payload)
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
    },
    setGettingData(state, payload) {
      state.gettingData = payload
    },
    setSubmitting(state, payload) {
      state.submitting = payload
    }
  },
  actions: { //asynchronous DISPATCH
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
    async getAllData({commit}) {
      commit('setGettingData', true)
      console.log('Store getAllData is called')
      const cToken = localStorage.getItem('csrftoken')
      await customAxios.get('/coffee/all', {headers: {'CSRFToken' : cToken}}).then((response) => {
        if (response) {
          let formattedResults = response.data
          for(let i = 0; i < formattedResults.length; i++){
            let day = new Date(formattedResults[i].date)
            formattedResults[i].date = day.toLocaleString('en-CA', {dateStyle: 'medium'})
          }
          commit("setData", formattedResults)
          commit('setGettingData', false)
        }
      }).catch((e) => {
        console.log('Store getAllData Error')
        console.log(e)
      })
    },
    async postEntry({getters, dispatch, commit}) {
      commit('setSubmitting', true)
      const post = getters['getPost']
      let response;
      let cToken = localStorage.getItem('csrftoken')
      try{
        response = await customAxios.post('coffee/new', post, {headers: {'CSRFToken' : cToken}})
        if (response) {
          alert('New Entry Success')
          commit('setSubmitting', false)
          dispatch('getAllData')
        }
      }catch (e) {
        console.log(e)
        commit('setSubmitting', false)
        alert('Entry Error: ' + e.response.data.message)
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
    },
    async checkSession({commit}){
      try{
        let response = await customAxios.get('/user/check')
        if (response.data.valid) {
          commit('setLoggedIn', true)
        }
      }catch (e) {
        console.log('Session not valid')
        commit('setLoggedIn', false)
      }
    },
    async logout({dispatch, commit}) {
      await customAxios.get('user/logout').then(response => {
        if (response) {
          console.log('logout response is...')
          console.log(response.data.message)
          dispatch('setLoggedIn', false)
          commit('setData', [])
          commit('setPost', {})
          router.push('/')
        }
      }).catch(e => {
        if (e) {
          console.log(e);
          this.message = e.response.data.message
        }
      })
    },
    async deleteEntry({commit, dispatch}, id){
      commit('setGettingData', true)
      const _id = id
      const cToken = localStorage.getItem('csrftoken')
      console.log(_id)
      try{
        let response = await customAxios.delete('coffee/deleteEntry', {data: {id: _id}, headers: {'CSRFToken' : cToken}})
        if (response.status == 200) {
          alert('Delete Entry Success')
          commit('setGettingData', false)
        }
      }catch (e) {
        console.log('Delete Error: ' + e)
        alert('Delete Error')
        commit('setGettingData', false)
      }
    },
    async editEntry({dispatch}, item){
      let id = item.id
      let toUpdate = item.body
      console.log('Item to update: ' + toUpdate)
      let cToken = localStorage.getItem('csrftoken')
      try{
        let response = await customAxios.put('coffee/updateEntry', {id: id, item: toUpdate}, {headers: {'CSRFToken' : cToken}})
        if (response) {
          alert('Entry Edited')
          dispatch('getAllData')
        }
      }catch (e) {
        console.log('Edit Entry Error: ' + e)
        alert('Entry was not updated. Error: ' + e)
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
    },
    getGettingData(state) {
      return state.gettingData
    },
    getSubmitting(state) {
      return state.submitting
    }
  }
})
