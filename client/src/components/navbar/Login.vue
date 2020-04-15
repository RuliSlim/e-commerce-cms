<template>
    <section>
        <button class="button is-primary"
            @click="isComponentModalActive = true">
            Login
        </button>

        <b-modal :active.sync="isComponentModalActive"
            has-modal-card :can-cancel="false">
            <modal-form @emitLogin="login($event)"></modal-form>
        </b-modal>
    </section>
</template>

<script>
import ModalForm from './Modal.vue'
    export default {
        name: "Login",
        components: {
            ModalForm
        },
        data() {
            return {
                isComponentModalActive: false,
            }
        },
        methods: {
          login(data) {
            this.$store.dispatch('login', data)
                .then(() => {
                    let user = this.$store.state.user;
                    this.$buefy.toast.open('Welcome ' + user);
                    this.$router.push({ path: 'dashboard' });
                })
                .catch(err => this.$buefy.toast.open(err.response.statusText));
          }
        }
    }
</script>