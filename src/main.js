import Vue from 'vue'

import './components'

// Sync router with store
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store/store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// axiosのデフォルト設定
Vue.prototype.$http = axios
// RestAPIのベースURL
axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.headers.get['Accept'] = 'application/json'

// トークンを既に持っていればヘッダー情報に追加
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + token
}

// DjangoのためのCSRF対策
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// VuexとVue-Routerを連動させる
sync(store, router)

// 製品モードか開発モードか
Vue.config.productionTip = false

// 本体となるVueインスタンスの生成
new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
