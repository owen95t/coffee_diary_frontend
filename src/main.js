import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store'
import VueScrollTo from 'vue-scrollto'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueScrollTo)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
