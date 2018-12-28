// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  import ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios
import axios from './utils/request'

import { getSession } from './utils/session';

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.userInfo = null
Vue.prototype.session = null
Vue.prototype.axios = axios

router.beforeEach((to, from, next) => {
  Vue.prototype.session = getSession();
  next();
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
