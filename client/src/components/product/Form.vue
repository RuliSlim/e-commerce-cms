<template>
  <section>
        <form @submit.prevent="addProduct">
            <b-field label="Name"
                message="This product name can not be empty">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="URL Image"
                message="This image url can not be empty">
                <b-input v-model="url"
                    placeholder="URL" type="url"
                    maxlength="30">
                </b-input>
            </b-field>

            <b-field label="Price"
                >
                <b-input v-model="price"
                    type="number" step="any"></b-input>
            </b-field>

            <b-field label="Stock"
                >
                <b-input v-model="stock"
                    type="number"></b-input>
            </b-field>

            <b-button tag="input" type="is-primary"
            native-type="submit"
            value="Submit input" />
        </form>
    </section>
</template>

<script>
export default {
  data() {
      return {
          name: null,
          url: null,
          price: null,
          stock: null
      }
  },
  methods: {
            addProduct() {
                // console.log('masuk')
                let newProduct = {
                    name: this.name,
                    image: this.url,
                    price: this.price,
                    stock: this.stock
                }
                this.$store.dispatch('addProduct', newProduct);
                this.name = null,
                this.url = null,
                this.price = null,
                this.stock = null
                this.$router.push({path: '/'})
            }
        }
}
</script>

<style>

</style>