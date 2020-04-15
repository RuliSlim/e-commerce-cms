<template>
    <section>
        <!-- <button class="button is-medium is-info" @click="confirm">
            Launch confirm (default)
        </button>

        <button class="button is-medium is-info" @click="confirmCustom">
            Launch confirm (custom)
        </button>

        <button class="button is-medium is-danger" @click="confirmCustomDelete">
            Launch confirm (custom)
        </button> -->
    </section>
</template>

<script>
    export default {
      mounted() {
        this.confirmCustomDelete();
        // console.log(this.$route.params.id, 'id')
      },
      computed: {
        routerId() {
          return this.$route.params.id
        }
      },
      methods: {
          confirmCustomDelete() {
              this.$buefy.dialog.confirm({
                  title: 'Deleting account',
                  message: 'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
                  confirmText: 'Delete Product',
                  type: 'is-danger',
                  hasIcon: true,
                  onCancel: () => this.$router.go(-1),
                  onConfirm: () => {
                    // this.$store.dispatch()
                    let id = this.routerId
                    // console.log(id, 'ID')
                    this.$store.dispatch('deleteProduct', id)
                      .then(() => {
                        this.$router.push({path: '/dashboard'})
                        // this.$router.push({path: '/'})
                        this.$buefy.toast.open('Product deleted!')
                        console.log('then dari deelamktk')
                      })
                      .catch(err => {
                        console.log(err, 'erorro ndiashda')
                        this.$router.push({path: '/dashboard'})
                        this.$buefy.toast.open(err.response.statusText)
                      })
                  }
              })
          }
      }
    }
</script>