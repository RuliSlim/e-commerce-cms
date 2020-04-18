import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@/assets/style.css';

import moment from 'moment';
Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueRouter);

Vue.filter('currency', function (money) {
  return accounting.formatMoney(money, "Rp ", 2, ".", ",")
});
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM/Do/YY')
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
