import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate"

// import axios from '../config/axios';
import { config } from '../config/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: localStorage.getItem('role'),
    token: localStorage.getItem('access_token'),
    products: [],
    product: 531513
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload.login;
      state.role = payload.role;
      state.token = payload.token;
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    GET_ONEPRODUCT (state , payload) {
      state.product = payload
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
            // console.log(res.data, 'hasil')
            resolve(commit('SET_PRODUCTS', res.data));
          })
          .catch(err => console.log(err));
      })
    },
    addProduct({ commit, state }, payload) {
      // payload.id = state.products.length + 1;
      // // console.log(state.products.length, 'panjang')
      // payload.createdAt = new Date();
      axios({
        method: 'POST',
        url: 'http://localhost:3000/products',
        data: payload,
        headers: {access_token: state.token}
      })
        .then(res => {
          commit('ADD_PRODUCT', res.data);
        })
        .catch(err => coalescing(err));
      // console.log(payload, 'store')
    },
    getProductById({ commit, state }, payload) {
      // return new Promise((resolve, reject) => {
        let found;
        state.products.forEach(el => {
          if(el.id == payload) {
            found = el;
          }
        })
        // for (let i in state.products) {
        //   if(state.products[i].id === payload) {
        //     console.log(state.products[i], 'IKI LOH')
        //     found = state.products[i]
        //     break
        //   }
        // }
        commit('GET_ONEPRODUCT', found)
      // })
    }
  },

})