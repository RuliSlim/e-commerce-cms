import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// components
import HomePage from '../views/HomePage.vue';
import Dashboard from '../views/Dashboard.vue';
import CreateProduct from '../views/CreateProduct.vue';
import Detail from '../views/Detail.vue';
import Edit from '../views/Edit.vue';
import Delete from '../views/Delete.vue';

Vue.use(VueRouter);

const routes = [
  // ADMIN DASHBOARD
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      let role = store.state.role
      if (role === 'admin') {
        next('/dashboard');
      } else {
        next();
      };
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      let role = store.state.role
      if(role === 'admin') {
        next();
      } else if (!role) {
        next({
          path: '/'
        });
      };
    },
    children: [
      {
        path: 'create',
        name: 'CreateProduct',
        component: CreateProduct
      },
      {
        path: 'product/:id',
        name: 'Detail',
        component: Detail
      },
      {
        path: 'product/:id/edit',
        name: 'Edit',
        component: Edit
      },
      {
        path: 'product/:id/delete',
        name: 'Delete',
        component: Delete
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router