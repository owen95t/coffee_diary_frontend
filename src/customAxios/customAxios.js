const axios = require('axios');
import router from '../router/index'
import store from '../store/index'

const customAxios = new axios.create({
    baseURL: 'https://api.coffeediary.app/api',
    // baseURL: 'http://localhost:3000/api',
    //for local testing
    timeout: 5000,
    withCredentials: true,
})
customAxios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
customAxios.defaults.withCredentials = true
customAxios.interceptors.request.use((request) => {
    //request
    return request
},
    error => {
    return Promise.reject(error)
})
customAxios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status == 401) {
        //alert('401 intercept')
        console.log('Error 401 intercepted by axios')
        //store.dispatch("setLoggedIn", false)
        store.commit('setLoggedIn', false)
    }
    return Promise.reject(error);
})

export default customAxios

