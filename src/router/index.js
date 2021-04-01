import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: () => import('../views/Home'),
        meta: {title: 'Home'}
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
        meta: {title: 'Login'}
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {title: 'Register'},
        // beforeEnter: (to, from, next) => {
        // //Can also do a beforeEnter specific route
        // }
    }
]

const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
    const status = store.getters.getLoggedIn
    console.log('BEFORE EACH STAT : ' + status)
    //With more routes, update this to:
    //if(to.name !== 'Login' && !status)
    //as this will check for all routes, and not just dashboard
    if (to.name == 'Dashboard' && !status) {
        next({name: 'Login'})
    } else {
        document.title = to.meta.title;
        next()
    }
})

export default router