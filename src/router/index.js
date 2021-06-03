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
        meta: {title: 'Coffee Diary Homepage'},
    },
    {
        path: '/login',
        name: 'Login to Coffee Diary',
        component: () => import('../views/LoginSimple'),
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
            title: 'Coffee Diary Dashboard',
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if(store.getters.getLoggedIn){
                next()
            }else{
                // let csrf = localStorage.getItem('csrftoken')
                // if(csrf != null){
                //     checkCSRF(csrf).then(response => {
                //         if (response.data.valid) {
                //             store.commit('setLoggedIn', true)
                //             if(response.headers['csrftoken'] != null){
                //                 localStorage.setItem('csrftoken', response.headers['csrftoken'])
                //             }
                //             next()
                //         }
                //     }).catch(e => {
                //         console.log(e)
                //         store.commit('setLoggedIn', false)
                //         next('/login')
                //     })
                // } else {
                check().then(response => {
                    if (response.data.valid) {
                        store.commit('setLoggedIn', true)
                        localStorage.setItem('csrftoken', response.headers['csrftoken'])
                        next()
                    }
                }).catch(e => {
                    console.log('App.vue Guard Checker Error' + e)
                    store.commit('setLoggedIn', false)
                    next('/login')
                })
                //}
            }
        }
    },
    {
        path: '/register',
        name: 'Register for Coffee Diary',
        component: () => import('../views/RegisterSimple'),
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
        path: '/loginsimple',
        name: 'Login Simple',
        component: () => import('../views/Login'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/registersimple',
        name: 'RegisterSimple',
        component: () => import('../views/Register'),
        meta: {
            title: 'Register'
        }
    }
]

const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router