import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import "./assets/css/common.css";
import "./assets/fonts/iconfont.js";

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'timer',
      path: '/timer',
      component: require('@/page/Timer')
    }  
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
