<template>
  <div id="app">
    <Navbar />
    <!-- <HomePage @emitLogin="loggedIn" v-if="!isLogin"/>
    <Dashboard v-if="role === 'admin'"/> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return {

    }
  },
  created(){
    this.$store.dispatch('getProducts')
  },
  methods: {

  }
};
</script>

<style>
</style>
