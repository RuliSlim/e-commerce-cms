<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="login">
      <md-field :class="messageClass">
          <label>email</label>
          <md-input v-model="email" required></md-input>
          <span class="md-error">There is an error</span>
      </md-field>
      <md-field :class="messageClass">
          <label>password</label>
          <md-input v-model="password" required></md-input>
          <span class="md-error">Password is required</span>
      </md-field>
      <md-button class="md-accent md-raised" type="submit">Login</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    noError: null,
    email: null,
    password: null,
    hasMessages: true
  }),
  computed: {
    messageClass () {
      if((this.password && !this.email) || (!this.password && this.email)) {
        return {'md-invalid': this.hasMessages}
      }
    }
  },
  methods: {
    login() {
      let self = this
      this.$axios({
        method: 'POST',
        url: self.cfg.$api_url + '/login',
        data: {
          email: self.email,
          password: self.password
        }
      })
    }
  }
}
</script>

<style>

</style>