<template>
    <b-navbar-item tag="div">
        <div class="buttons">
            <a class="button is-primary">
                <strong>Sign up</strong>
            </a>
            <Login @emitLogin="login($event)"/>
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
    methods: {
        login(data) {
            localStorage.setItem('role', 'admin');
            this.$router.push({ path: 'dashboard' });
        }
    }
}
</script>

<style>

</style>