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
import HomePage from './views/HomePage.vue';
import Dashboard from './views/Dashboard.vue';
import Navbar from './components/navbar/Navbar.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    Dashboard,
    Navbar
  },
  data(){
    return {
      role: null,
      isLogin: false
    }
  },
  methods: {
    loggedIn(){
      this.role = 'admin'
      this.isLogin = true
      // this.$router.go('/dashboard')
      this.$router.push({ path: 'dashboard' })
    }
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
