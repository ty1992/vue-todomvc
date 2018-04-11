// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css'
import './assets/css/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.afterEach((to, from) => {
  window.vm.filter = to.path || 'all';
})
