// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('es6-promise').polyfill();
// require('es6-object-assign').polyfill();

import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import $ from 'jquery'
import * as Cookies from "js-cookie";
var scrollify = require('jquery-scrollify');
var ECharts = require('vue-echarts')
//import css
import '../src/css/homepage.css'
// import '../src/api/es6-promise.auto.min.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('chart', ECharts)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  Promise,
  template: '<App/>',
  components: { App }
})
