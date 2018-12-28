import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'

import Guard from './guard'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Index,
      beforeEnter: Guard
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      beforeEnter: Guard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: 'login',
    //   redirect: {name:'Login'}
    // },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
});

export default router
