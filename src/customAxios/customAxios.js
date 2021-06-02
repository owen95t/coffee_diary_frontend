const axios = require('axios');
import router from '../router/index'
import store from '../store/index'

const customAxios = new axios.create({
    baseURL: 'https://secret-meadow-27419.herokuapp.com/api',
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

