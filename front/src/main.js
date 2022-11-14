import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueFormulate from '@braid/vue-formulate'

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

createApp(App).use(store).use(router).mount('#app')
