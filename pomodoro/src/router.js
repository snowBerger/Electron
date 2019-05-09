import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const Tasks = (resolve) => require(['@/views/tasks'], resolve)
const Timer = (resolve) => require(['@/views/timer'], resolve)
const Setting = (resolve) => require(['@/views/setting'], resolve)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'tasks' }
    },
    {
      name: 'tasks',
      path: '/tasks',
      component: Tasks
    },
    {
      name: 'timer',
      path: '/timer',
      component: Timer
    },
    {
      name: 'setting',
      path: '/setting',
      component: Setting
    }
  ]
})