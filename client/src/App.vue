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
      // .then(() => )
  },
  methods: {

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
