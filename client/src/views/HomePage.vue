<template>
  <h1>Landing page</h1>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({

  }),
  methods: {
    login() {
      // let self = this
      // // this.$axios({
      // //   method: 'POST',
      // //   url: self.cfg.$api_url + '/login',
      // //   data: {
      // //     email: self.email,
      // //     password: self.password
      // //   }
      // // })
      // this.$emit('emitLogin');
      localStorage.setItem('role', 'admin');
      this.$router.push({ path: 'dashboard' })
    }
  }
}
</script>

<style>

</style>