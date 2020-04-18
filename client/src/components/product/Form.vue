<template>
  <div>
    <!-- ADD -->
    <section v-if="type == 'addProduct'">
        <section class="hero is-primary top-title">
          <div class="hero-body">
            <h1 class="title">
              Add Product
            </h1>
          </div>
        </section>
        <div class="container">
          <form @submit.prevent="addProduct">
              <b-field label="Name"
                  message="This product name can not be empty">
                  <b-input v-model="name"></b-input>
              </b-field>

              <b-field label="URL Image"
                  message="This image url can not be empty">
                  <b-input v-model="image"
                      placeholder="URL" type="url"
                      >
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
        </div>
    </section>
    <!-- EDIT -->
    <section v-else>
      <section class="hero is-primary top-title">
        <div class="hero-body" id="hero-body">
          <div class="container">
            <h1 class="title">
              Edit
            </h1>
          </div>
        </div>
      </section>
      <div class="container">
        <form @submit.prevent="editProduct">
          <b-field label="Name"
              message="This product name can not be empty">
              <b-input v-model="name"></b-input>
          </b-field>
          
          <div class="columns">
            <div class="column is-1">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="image">
                </p>
              </figure>
            </div>
            <div class="column is-11">
              <div class="content">
                <b-field label="URL Image"
                    message="This image url can not be empty">
                    <b-input v-model="image"
                        placeholder="URL" type="url"
                        >
                    </b-input>
                </b-field>
              </div>
            </div>
          </div>

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
      </div>
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
    editProduct() {
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
      let existingProduct = this.getData
      if(this.type == 'edit') {
        this.name = existingProduct.name
        this.image = existingProduct.image
        this.price = existingProduct.price
        this.stock = existingProduct.stock
      }
    }
  }
}
</script>

<style>
  section.hero.is-primary.top-title{
    margin-top: -5.2% !important;
  }
  .body{
    text-align: right !important;
  }
</style>