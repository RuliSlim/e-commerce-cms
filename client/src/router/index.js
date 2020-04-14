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
      // if(localStorage.getItem('access_token')) {
        let role = localStorage.getItem('role');
        if (role === 'admin') {
          next('/dashboard');
        } else {
          next();
        };
      // };
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      
    ],
    beforeEnter: (to, from, next) => {
      // if(localStorage.getItem('access_token')) {
        let role = localStorage.getItem('role');
        if(role === 'admin') {
          next();
        } else if (!role) {
          next({
            path: '/'
          });
        };
      // };
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router