// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import 'amfe-flexible'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueResource from 'vue-resource'
import './mock'
import fetchTOP from '@/utils/fetchTOP'

Vue.use(MintUI)
Vue.use(VueResource)

Vue.prototype.$fetchTOP = fetchTOP

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
