import axios, { type AxiosInstance } from 'axios'

const customAxios: AxiosInstance = axios.create({
  baseURL: 'https://api.coffeediary.app/api',
  timeout: 5000,
  withCredentials: true,
})

customAxios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
customAxios.defaults.withCredentials = true

export default customAxios
