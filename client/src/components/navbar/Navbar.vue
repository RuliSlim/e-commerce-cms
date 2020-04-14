<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>

        <!-- <div class="md-toolbar-row"> -->
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home"></md-tab>
            <md-tab id="tab-pages" md-label="Products"></md-tab>
            <md-tab id="tab-posts" md-label="Create Product"></md-tab>
            <md-tab id="tab-favorites" md-label="Stats" @click="route"></md-tab>
          </md-tabs>
        <!-- </div> -->
      </md-app-toolbar>



    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    route() {
      console.log('you')
      this.$router.push({ path: '/dashboard/create' })
    }
  }
}
</script>

<style>
  .navbar{
    top: 0;
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