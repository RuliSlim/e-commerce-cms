<template>
    <form-product :type="'addProduct'"/>
</template>

<script>
import Form from '../components/product/Form.vue'
    export default {
        name: 'CreateProduct',
        components: { 'form-product': Form }
    }
</script>

<style>

</style>