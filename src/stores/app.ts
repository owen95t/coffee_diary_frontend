import { defineStore } from 'pinia'
import customAxios from '@/customAxios/customAxios'
import type { ApiMessageResponse, SessionCheckResponse } from '@/types/api'
import type { CoffeeEntry, CoffeeEntryForm, CoffeeEntryUpdate } from '@/types/coffee'
import { getErrorMessage, isUnauthorizedError } from '@/utils/api'

interface AppState {
  isLoggedIn: boolean
  results: CoffeeEntry[]
  gettingData: boolean
  submitting: boolean
  loggingOut: boolean
  sessionChecked: boolean
}

const getCsrfToken = (): string => localStorage.getItem('csrftoken') ?? ''

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isLoggedIn: false,
    results: [],
    gettingData: false,
    submitting: false,
    loggingOut: false,
    sessionChecked: false,
  }),
  actions: {
    setLoggedIn(payload: boolean): void {
      this.isLoggedIn = payload
      this.sessionChecked = true
    },
    clearResults(): void {
      this.results = []
    },
    handleUnauthorized(): void {
      this.isLoggedIn = false
      this.sessionChecked = true
      this.results = []
      localStorage.removeItem('csrftoken')
    },
    async getAllData(): Promise<void> {
      this.gettingData = true

      try {
        const response = await customAxios.get<CoffeeEntry[]>('/coffee/all', {
          headers: { CSRFToken: getCsrfToken() },
        })

        this.results = response.data
      } catch (error: unknown) {
        if (isUnauthorizedError(error)) {
          this.handleUnauthorized()
        }

        console.log('Store getAllData Error')
        console.log(error)
      } finally {
        this.gettingData = false
      }
    },
    async postEntry(entryInfo: CoffeeEntryForm): Promise<void> {
      this.submitting = true

      try {
        const response = await customAxios.post<ApiMessageResponse>('coffee/new', entryInfo, {
          headers: { CSRFToken: getCsrfToken() },
        })

        if (response) {
          alert('New Entry Success')
          await this.getAllData()
        }
      } catch (error: unknown) {
        if (isUnauthorizedError(error)) {
          this.handleUnauthorized()
        }

        console.log(error)
        alert(`Entry Error: ${getErrorMessage(error)}`)
        throw error
      } finally {
        this.submitting = false
      }
    },
    async checkSession(): Promise<boolean> {
      if (this.sessionChecked) {
        return this.isLoggedIn
      }

      try {
        const response = await customAxios.get<SessionCheckResponse>('/user/check')
        this.isLoggedIn = Boolean(response.data.valid)

        if (!this.isLoggedIn) {
          localStorage.removeItem('csrftoken')
        }
      } catch (error: unknown) {
        this.isLoggedIn = false
        localStorage.removeItem('csrftoken')
      } finally {
        this.sessionChecked = true
      }

      return this.isLoggedIn
    },
    async logout(): Promise<boolean> {
      this.loggingOut = true

      try {
        const response = await customAxios.get<ApiMessageResponse>('user/logout')

        if (response) {
          console.log('logout response is...')
          console.log(response.data.message)
          this.isLoggedIn = false
          this.results = []
          localStorage.removeItem('csrftoken')
          return true
        }
      } catch (error: unknown) {
        if (isUnauthorizedError(error)) {
          this.handleUnauthorized()
        }

        console.log(error)
        alert(`Log Out Error: ${getErrorMessage(error)}`)
        return false
      } finally {
        this.loggingOut = false
        this.sessionChecked = true
      }

      return false
    },
    async deleteEntry(id: string): Promise<void> {
      this.gettingData = true

      try {
        const response = await customAxios.delete<ApiMessageResponse>('coffee/deleteEntry', {
          data: { id },
          headers: { CSRFToken: getCsrfToken() },
        })

        if (response.status === 200) {
          alert('Delete Entry Success')
          await this.getAllData()
        }
      } catch (error: unknown) {
        if (isUnauthorizedError(error)) {
          this.handleUnauthorized()
        }

        console.log(`Delete Error: ${getErrorMessage(error)}`)
        alert('Delete Error')
        throw error
      } finally {
        this.gettingData = false
      }
    },
    async editEntry(item: CoffeeEntryUpdate): Promise<void> {
      this.gettingData = true

      try {
        const response = await customAxios.put<ApiMessageResponse>(
          'coffee/updateEntry',
          { id: item.id, item: item.body },
          { headers: { CSRFToken: getCsrfToken() } }
        )

        if (response) {
          alert('Entry Edited')
          await this.getAllData()
        }
      } catch (error: unknown) {
        if (isUnauthorizedError(error)) {
          this.handleUnauthorized()
        }

        console.log(`Edit Entry Error: ${getErrorMessage(error)}`)
        alert(`Entry was not updated. Error: ${getErrorMessage(error)}`)
        throw error
      } finally {
        this.gettingData = false
      }
    },
  },
})
