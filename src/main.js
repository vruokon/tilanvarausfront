import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Vuex)
Vue.use(ElementUi, {locale})

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: null,
    user_level: 0
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
