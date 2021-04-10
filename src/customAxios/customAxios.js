const axios = require('axios');
import router from '../router/index'

const customAxios = new axios.create({
    baseURL: 'http://localhost:3000/api/',
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
        alert('401 intercept')
        //router.push('/login')
    }
    return Promise.reject(error);
})

export default customAxios

