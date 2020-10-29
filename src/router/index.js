import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/todolist',
    name: 'TodoList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/TodoList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router