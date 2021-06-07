import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: () => import('../views/Home'),
        meta: {title: 'Coffee Diary'},
    },
    {
        path: '/login',
        name: 'Login to Coffee Diary',
        component: () => import('../views/LoginSimple'),
        meta: {title: 'Login'},
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard'),
        meta: {
            title: 'Coffee Diary Dashboard',
            requiresAuth: true
        },
    },
    {
        path: '/register',
        name: 'Register for Coffee Diary',
        component: () => import('../views/RegisterSimple'),
        meta: {title: 'Register'},

    },
    // {
    //     path: '/dashboard2',
    //     name: 'Dashboard2',
    //     component: () => import('../views/Dashboard2'),
    //     meta: {
    //         title: 'Dashboard2'
    //     }
    // },
    // {
    //     path: '/loginsimple',
    //     name: 'Login Simple',
    //     component: () => import('../views/Login'),
    //     meta: {
    //         title: 'Login'
    //     }
    // },
    // {
    //     path: '/registersimple',
    //     name: 'RegisterSimple',
    //     component: () => import('../views/Register'),
    //     meta: {
    //         title: 'Register'
    //     }
    // }
]

const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router