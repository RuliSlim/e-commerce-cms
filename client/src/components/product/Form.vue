<template>
  <div>
    <!-- ADD -->
    <section v-if="type == 'addProduct'">
        <form @submit.prevent="addProduct">
            <b-field label="Name"
                message="This product name can not be empty">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="URL Image"
                message="This image url can not be empty">
                <b-input v-model="image"
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
    <!-- EDIT -->
    <section v-else>
        <form @submit.prevent="ediProduct">
            <b-field label="Edit"
                message="This product name can not be empty">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="URL Image"
                message="This image url can not be empty">
                <b-input v-model="image"
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
  </div>
</template>

<script>
export default {
  props: ['type'],
  data() {
      return {
          name: '',
          price: '',
          stock: '',
          image: '',
          data: {}
      }
  },
  methods: {
    addProduct() {
        let newProduct = {
            name: this.name,
            image: this.image,
            price: this.price,
            stock: this.stock
        }
        this.$store.dispatch('addProduct', newProduct)
          .then(() => this.$buefy.toast.open('Product created'))
          .catch(err => this.$buefy.open(err.response.statusText));
        this.name = null,
        this.url = null,
        this.price = null,
        this.stock = null
        this.$router.push({path: '/dashboard'})
    },
    ediProduct() {
      let id = this.routerId
        let newProduct = {
            id: id,
            name: this.name,
            image: this.image,
            price: this.price,
            stock: this.stock
        }
        this.$store.dispatch('editProduct', newProduct)
          .then(() => {
            this.$buefy.toast.open('Product updated!')
            this.name = null,
            this.image = null,
            this.price = null,
            this.stock = null
            this.$router.push({path: '/dashboard'})
          })
          .catch((err) => this.$buefy.toast.open(err.response.statusText));
    }
  },
  mounted() {
    this.$store.dispatch('getProductById', this.routerId)
    let existingProduct = this.getData
    if(this.type == 'edit') {
      alert('YO')
      this.name = existingProduct.name
      this.image = existingProduct.image
      this.price = existingProduct.price
      this.stock = existingProduct.stock
    }

  },
  beforeUpdate() {
    this.$store.dispatch('getProductById', this.routerId)
    this.data = this.$store.state.product
  },
  computed: {
    routerId() {
      return this.$route.params.id
    },
    getData() {
      return this.data = this.$store.state.product
    }
  },
  watch: {
    routerId () {
      this.$store.dispatch('getProductById', this.routerId)
      this.getData
    }
  }
}
</script>

<style>

</style>