import Vue from 'vue';
import VueRouter from 'vue-router';

// components
import HomePage from '../views/HomePage.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
  // ADMIN DASHBOARD
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')) {
        let role = localStorage.getItem('role');
        if (role === 'admin') {
          next({
            path: '/dashboard'
          });
        } else {
          next({
            path: '/'
          });
        };
      };
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')) {
        let role = localStorage.getItem('role');
        if(role === 'admin') {
          next();
        } else {
          next({
            path: '/'
          });
        };
      };
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router