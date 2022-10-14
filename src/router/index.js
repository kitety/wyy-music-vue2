import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend'),
    children: [{
      path: 'detail/:id/:type',
      component: () => import('@/views/Detail')
    }]
  }, {
    path: '/singer',
    component: () => import('@/views/Singer'),
    children: [{
      path: 'detail/:id/:type',
      component: () => import('@/views/Detail')
    }]
  }, {
    path: '/rank',
    component: () => import('@/views/Rank')
  }, {
    path: '/search',
    component: () => import('@/views/Search')
  }, {
    path: '/account',
    component: () => import('@/views/Account')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
