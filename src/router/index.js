import Vue from 'vue'
import VueRouter from 'vue-router'
import Workspaces from '../views/Workspaces.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Workspaces',
    component: Workspaces
  },
  {
    path: '/reservations',
    name: 'Reservations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Reservations.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
