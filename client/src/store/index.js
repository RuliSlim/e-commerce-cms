import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"

import axios from 'axios';
import { config } from '@/config/config.js';
axios.defaults.baseURL = config.$url;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: null,
    token: null,
    user: null,
    products: [],
    product: {},
    totalSales: 0
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_ISLOGIN: (state, payload) => {
      state.isLogin = payload.login;
      state.role = payload.role;
      state.token = payload.token;
      state.user = payload.user;
    },
    SET_LOGOUT: (state, payload) => {
      state.isLogin = false;
      state.role = null;
      state.token = null;
      state.user = null;
    },
    SET_PRODUCTS: (state, payload) => {
      state.products = payload;
      state.totalSales = 0;
      state.products.forEach(el => {
        state.totalSales += el.sold
      })
    },
    ADD_PRODUCT: (state, payload) => {
      state.products.push(payload);
    },
    GET_ONEPRODUCT: (state , payload) => {
      state.product = payload;
    },
    EDIT_PRODUCT: (state, payload) => {
      let newData = state.products.filter(el => el.id != payload[0].id);
      newData.push(payload[0]);
      state.products = newData
    },
    DELETE_PRODUCT: (state, payload) => {
      let newData = state.products.filter(el => el.id != payload.id);
      state.products = newData;
    }
  },
  actions: {
    login({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(res => {
          const payload = {
            token: res.data.access_token,
            role: res.data.role,
            login: true,
            user: res.data.user
          }
          console.log(res.data)
          commit('SET_ISLOGIN', payload);
        })
        .catch(err => {
          console.log(err)
        });
    },
    getProducts({ commit }) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(res => {
          commit('SET_PRODUCTS', res.data)
        })
        .catch(err => console.log(err));
    },
    addProduct({ commit, state }, payload) {
      return axios({
        method: 'POST',
        url: '/products',
        data: payload,
        headers: {access_token: state.token}
      })
        .then(res => {
          commit('ADD_PRODUCT', res.data);
        })
        .catch(err => console.log(err));
    },
    getProductById({ commit, state }, payload) {
      let found;
      state.products.forEach(el => {
        if(el.id == payload) {
          found = el;
        }
      })
      commit('GET_ONEPRODUCT', found)
    },
    editProduct({ commit, state }, payload) {
      return axios({
        method: 'PUT',
        url: '/products/' + payload.id,
        data: payload,
        headers: {access_token: state.token}
      })
        .then(res => {
          commit('EDIT_PRODUCT', res.data[1])
        })
    },
    deleteProduct({ commit, state }, payload) {
        return axios({
          method: 'DELETE',
          url: '/products/' + payload,
          headers: {access_token: state.token}
        })
          .then((res) => {
            commit('DELETE_PRODUCT', res.data)
          })
    },
    logOut({ commit, state }) {
      return new Promise((res, rej) => {
        res(state.user)
        commit('SET_LOGOUT')
      })
    }
  },

})