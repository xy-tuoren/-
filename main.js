import App from './App'
import uView from "./plugIn/uView.js"
import store from './store/index.js'
import tabBar from './components/tabBar/tabBar.vue'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.component('tab-bar',tabBar)

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

//将app参数传递到配置中
require('./api/network.js')(app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif