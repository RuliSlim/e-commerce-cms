import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// import axios from '../config/axios';
import { config } from '../config/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: localStorage.getItem('role'),
    token: localStorage.getItem('access_token'),
    products: []
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload.login;
      state.role = payload.role;
      state.token = payload.token;
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: payload
        })
          .then(res => {
            const payload = {
              token: res.data.access_token,
              role: res.data.role,
              login: true
            }
            localStorage.setItem('access_token', payload.token);
            localStorage.setItem('role', payload.role);
            resolve(commit('SET_ISLOGIN', payload));
          })
          .catch(err => {
            console.log(err)
          });
      })
    },
    getProducts({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/products'
        })
          .then(res => {
            console.log(res.data, 'hasil')
            resolve(commit('SET_PRODUCTS', res.data));
          })
          .catch(err => next(err));
      })
    }
  }
})