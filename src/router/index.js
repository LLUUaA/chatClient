import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
const Index = ()=> import('@/components/Index');
const SingleRouter = ()=> import('@/components/Single');
const RoomRouter = ()=> import('@/components/Room');
const NotFound = () =>import('@/components/NotFound');
const searchRouter = ()=>import('@/components/search')

import Guard from './guard'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      beforeEnter: Guard,
      children:[
        {
          path:'',
          name:'single',
          component: SingleRouter
        },
        {
          path:'/index/single',
          name:'single2',
          component: SingleRouter
        },
        {
          path:'/index/room',
          name:'room',
          component: RoomRouter
        },
        {
          path:'/index/search',
          name:'search',
          component: searchRouter
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
});

export default router
