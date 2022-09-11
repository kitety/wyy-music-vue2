import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入
import FastClick from 'fastclick'
import './assets/css/base.scss'

// 初始化FastClick实例。在页面的DOM文档加载完成后
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
