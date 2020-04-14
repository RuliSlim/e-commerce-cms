<template>
    <section>
        <button class="button is-primary"
            @click="isComponentModalActive = true">
            Login
        </button>

        <b-modal :active.sync="isComponentModalActive"
            has-modal-card full-screen :can-cancel="false">
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
            console.log(data, 'login com')
            this.$emit('emitLogin', data)
          }
        }
    }
</script>