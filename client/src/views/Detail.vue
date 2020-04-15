<template>
  <div class="container tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="tile is-parent">
        <article class="tile is-child notification">
          <p class="title">
            <img :src="data.image" class="primImage" alt="Placeholder image">
          </p>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success">
        <div class="content">
          <p class="title">{{data.name}}</p>
          <div class="content">
            <p>Description goes here later..</p>
            <div class="columns">
              <div class="column is-4">
                <p>Harga: </p>
              </div>
              <div class="column">
                <p>Rp {{data.price}}</p>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <p>Stock: </p>
              </div>
              <div class="column">
                <p>{{data.stock}}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      data: {},
    }
  },
  mounted() {
    this.$store.dispatch('getProductById', this.routerId)
    this.getData
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