// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import bus from './bus'
import utils from '@/utils'
import 'babel-polyfill'
import '@/derective'

import '@/assets/sass/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(bus)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
