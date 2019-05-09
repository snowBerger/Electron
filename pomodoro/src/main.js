import Vue from 'vue'
import App from './App.vue'
import "./assets/css/common.css";
import "./assets/fonts/iconfont.js";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
