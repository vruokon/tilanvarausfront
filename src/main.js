import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(ElementUi)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: null
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
