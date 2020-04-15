<template>
    <b-navbar-item tag="div" >
        <div class="buttons" v-if="!isLogin">
            <a class="button is-primary">
                <strong>Sign up</strong>
            </a>
            <Login @emitLogin="login($event)"/>
        </div>
        <div class="buttons" v-else @click="logOut">
            <a class="button is-primary" >
                <strong>Logout</strong>
            </a>
        </div>
    </b-navbar-item>
</template>

<script>
import Login from './Login.vue'

export default {
    name: 'User',
    components: {
        Login
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('logOut')
                .then((res) => this.$buefy.toast.open('Bye ' + res))
                .catch(() => this.$buefy.toast.open(err.response.statusText));
            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>