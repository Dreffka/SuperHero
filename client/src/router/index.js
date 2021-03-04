import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: "/",
    alias: "/heroes",
    name: "heroes",
    component: Home
  },
  {
    path: "/heroes/:id",
    name: "heroes-details",
    component: () => import("../views/Hero")
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/Create")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../views/Edit")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
