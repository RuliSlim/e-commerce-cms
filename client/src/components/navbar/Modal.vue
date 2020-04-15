<template>
  <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
      </header>
      <form @submit.prevent="login">
        <section class="modal-card-body">
            <b-field label="Email">
                <b-input
                    type="email"
                    v-model="email"
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>

            <b-field label="Password">
                <b-input
                    type="password"
                    v-model="password"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" type="submit">Login</button>
        </footer>
      </form>
  </div>
</template>

<script>
export default {
  name: 'ModalForm',
  data() {
    return {
        email: null,
        password: null
    }
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      }
      this.email = '';
      this.password = '';
      this.$emit('emitLogin', data);
      this.$parent.close()
    }
  }
}
</script>

<style>

</style>