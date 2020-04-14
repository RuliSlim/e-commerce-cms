import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router'
import axios from 'axios';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css' ;



Vue.config.productionTip = false;
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(axios)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
