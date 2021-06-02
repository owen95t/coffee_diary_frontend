import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index'
import customAxios from "@/customAxios/customAxios";

Vue.use(VueRouter);

const check = () => {
    return customAxios.get('user/check')
}


const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: () => import('../views/Home'),
        meta: {title: 'Home'},
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
        meta: {title: 'Login'},
        beforeEnter: (to, from, next) => {
            if(store.getters.getLoggedIn){
                next('/dashboard')
            }else{
                check().then(response => {
                    if (response.data.valid) {
                        store.commit('setLoggedIn', true)
                        localStorage.setItem('csrftoken', response.headers['csrftoken'])
                        next('/dashboard')
                    }
                }).catch(e => {
                    console.log('App.vue Guard Checker Error' + e)
                    store.commit('setLoggedIn', false)
                    next()
                })
            }
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if(store.getters.getLoggedIn){
                next()
            }else{
                next('/login')
            }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {title: 'Register'},

    },
    {
        path: '/dashboard2',
        name: 'Dashboard2',
        component: () => import('../views/Dashboard2'),
        meta: {
            title: 'Dashboard2'
        }
    },
    {
        path: '/login2',
        name: 'Login2',
        component: () => import('../views/EntryView')
    }
]

const router = new VueRouter({routes})


export default router