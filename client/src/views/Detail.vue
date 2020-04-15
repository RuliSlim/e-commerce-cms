<template>
  <div class="container tile is-ancestor">
    <!-- <div class="">
      <figure class="image">
      </figure>
    </div> -->
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
                <p>Sock: </p>
              </div>
              <div class="column">
                <p>{{data.stock}}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <!-- <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="data.image" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{data.name}}</p>
          <p class="subtitle is-6">{{data.price}}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div> -->
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
      // console.log(this.routerId)
    }
  }
}
</script>

<style>
  .primImage{
    /* width: 35% !important; */
  }
</style>