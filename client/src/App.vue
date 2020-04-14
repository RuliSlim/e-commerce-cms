<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HomePage />
    <!-- <Dashboard v-if="this.role === 'admin'"/> -->
    <router-view />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue';
// import Dashboard from './views/Dashboard.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    // Dashboard,
  },
  data(){
    return {
      role: null
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
