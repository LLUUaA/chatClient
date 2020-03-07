// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import axios from './service/request'
// web socket
import WS from './service/socket'
// filters
import * as Filters from './filter'
// listen
import listen from './service/listen';

import { getSession } from './service/session'
import globalData from './globalData'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn');

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$globalData = globalData
Vue.prototype.WS = null;
Vue.prototype.axios = axios
Vue.prototype.dayjs = dayjs
Vue.prototype.myListener = listen;

// register filter
Object.keys(Filters).forEach(k => Vue.filter(k,Filters[k]));

// router beforeEach
router.beforeEach((to, from, next) => {
  if (to.path.indexOf("/index") < 0) {
    return next(); // returns
  }
  globalData.session = getSession();

  const connected = Vue.prototype.WS && Vue.prototype.WS.connected; // 是否连接
  if (connected) {
    return next();
  }
  WS(globalData.session, (socket) => {
    Vue.prototype.WS = socket;
    if (socket) {
      next();
    } else {
      router.push('/login');
    }
  });

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
