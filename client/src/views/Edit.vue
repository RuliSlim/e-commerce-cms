<template>
  <form-product :type="'edit'"/>
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