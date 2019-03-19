// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import axios from './utils/request'
import { getSession } from './utils/session';
import globalData from './globalData'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn');

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$globalData = globalData
Vue.prototype.axios = axios
Vue.prototype.dayjs = dayjs

Vue.filter('time' ,function(value){
  value = dayjs(value).format('YYYY-MM-DD HH:SS');
  return value;
})

Vue.filter('birthday' ,function(value){
  value = dayjs(value).format('YYYY-MM-DD');
  return value;
})

Vue.filter('sex',function(value){
  switch (value) {
    case 1:
      value = '男'
      break;
    case 2:
      value = '女'
      break;

    default:
      value = '未知'
      break;
  }
  return value;
})

router.beforeEach((to, from, next) => {
  globalData.session = getSession();
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
