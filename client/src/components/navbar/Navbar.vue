<template>
    <b-navbar class="is-dark nav">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link"
                to="/dashboard"
                type="is-link">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link"
                to="/dashboard/stats"
                type="is-link" v-if="checkRole == 'admin'">
                Stats
            </b-navbar-item>
            <!-- <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <template slot="end">
          <User />
        </template>

    </b-navbar>
</template>

<script>
import User from './User.vue';

export default {
  name: 'Navbar',
  components: {
    User
  },
  methods: {
    route() {
      this.$router.push({ path: '/dashboard/create' })
    }
  },
  computed: {
    checkRole() {
      return this.$store.state.role
    }
  }
}
</script>

<style scoped>
  .nav{
    margin-bottom: 70px;
  }
  /* .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  } */
</style>