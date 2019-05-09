import Vue from 'vue'
import App from './App.vue'
import "./assets/css/common.css";
import "./assets/fonts/iconfont.js";
import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
