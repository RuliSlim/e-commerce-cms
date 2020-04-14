import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router'
import axios from 'axios';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false;
Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(axios)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
