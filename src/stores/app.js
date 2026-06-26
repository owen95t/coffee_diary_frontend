import { defineStore } from 'pinia'
import customAxios from '@/customAxios/customAxios'

const getCsrfToken = () => localStorage.getItem('csrftoken') ?? ''

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoggedIn: false,
    results: [],
    gettingData: false,
    submitting: false,
    loggingOut: false,
    sessionChecked: false,
  }),
  actions: {
    setLoggedIn(payload) {
      this.isLoggedIn = payload
      this.sessionChecked = true
    },
    clearResults() {
      this.results = []
    },
    handleUnauthorized() {
      this.isLoggedIn = false
      this.sessionChecked = true
      this.results = []
      localStorage.removeItem('csrftoken')
    },
    async getAllData() {
      this.gettingData = true
      try {
        const response = await customAxios.get('/coffee/all', {
          headers: { CSRFToken: getCsrfToken() },
        })
        this.results = response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        console.log('Store getAllData Error')
        console.log(error)
      } finally {
        this.gettingData = false
      }
    },
    async postEntry(entryInfo) {
      this.submitting = true
      try {
        const response = await customAxios.post('coffee/new', entryInfo, {
          headers: { CSRFToken: getCsrfToken() },
        })
        if (response) {
          alert('New Entry Success')
          await this.getAllData()
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        console.log(error)
        alert(`Entry Error: ${error.response?.data?.message ?? error.message}`)
        throw error
      } finally {
        this.submitting = false
      }
    },
    async checkSession() {
      if (this.sessionChecked) {
        return this.isLoggedIn
      }

      try {
        const response = await customAxios.get('/user/check')
        this.isLoggedIn = Boolean(response.data.valid)
        if (!this.isLoggedIn) {
          localStorage.removeItem('csrftoken')
        }
      } catch (error) {
        this.isLoggedIn = false
        localStorage.removeItem('csrftoken')
      } finally {
        this.sessionChecked = true
      }

      return this.isLoggedIn
    },
    async logout() {
      this.loggingOut = true
      try {
        const response = await customAxios.get('user/logout')
        if (response) {
          console.log('logout response is...')
          console.log(response.data.message)
          this.isLoggedIn = false
          this.results = []
          localStorage.removeItem('csrftoken')
          return true
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        console.log(error)
        alert(`Log Out Error: ${error.response?.data?.message ?? error.message}`)
        return false
      } finally {
        this.loggingOut = false
        this.sessionChecked = true
      }
      return false
    },
    async deleteEntry(id) {
      this.gettingData = true
      try {
        const response = await customAxios.delete('coffee/deleteEntry', {
          data: { id },
          headers: { CSRFToken: getCsrfToken() },
        })
        if (response.status === 200) {
          alert('Delete Entry Success')
          await this.getAllData()
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        console.log('Delete Error: ' + error)
        alert('Delete Error')
        throw error
      } finally {
        this.gettingData = false
      }
    },
    async editEntry(item) {
      this.gettingData = true
      try {
        const response = await customAxios.put(
          'coffee/updateEntry',
          { id: item.id, item: item.body },
          { headers: { CSRFToken: getCsrfToken() } }
        )
        if (response) {
          alert('Entry Edited')
          await this.getAllData()
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        console.log('Edit Entry Error: ' + error)
        alert(`Entry was not updated. Error: ${error}`)
        throw error
      } finally {
        this.gettingData = false
      }
    },
  },
})
