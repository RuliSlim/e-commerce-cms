<template>
    <section class="container">
        <router-view />
        <b-button type="is-success" class="is-left" outlined @click="showAdd" v-html="html"
        >Add Product</b-button>
        <b-table
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="id"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :selected.sync="selected"
            @click="getById"
            focusable
            >

            <template slot-scope="props" label="Selected">
                <b-table-column field="id" label="ID" width="40" sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="price" label="Price" sortable numeric >
                    {{ props.row.price }}
                </b-table-column>

                <b-table-column field="stock" label="Stock" sortable numeric>
                    {{ props.row.stock }}
                </b-table-column>

                <b-table-column field="createdAt" label="Date" sortable>
                    <span class="tag is-success">
                        {{ new Date(props.row.createdAt).toLocaleDateString() }}
                    </span>
                </b-table-column>
            </template>
            
        </b-table>
        <!-- <router-view> -->
    </section>
</template>

<script>

    export default {
        name: 'Dashboard',
        data() {
            return {
                data: [],
                isPaginated: true,
                isPaginationSimple: true,
                paginationPosition: 'top',
                defaultSortDirection: 'asc',
                sortIcon: 'chevron-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 10,
                url: 'http://localhost:3000/products',
                isShowAdd: false,
                html: 'Add Product',
                selected: null
            }
        },
        mounted(){
            this.$store.dispatch('getProducts')
                .then(() => {
                    // this.data = this.$store.state.products;
                    // this.data = this.getData();
                    this.getData
                })
                .catch(err => console.log(err));
        },
        computed: {
            getData() {
                return this.data = this.$store.state.products
            }
        },
        methods: {
            showAdd() {
                this.isShowAdd = !this.isShowAdd;
                if(this.isShowAdd) {
                    this.$router.push({ name: 'CreateProduct'})
                    this.html = 'Back'
                } else {
                    this.$router.go(-1)
                    this.html = 'Add Product'
                }
            },
            getById(baru, old) {
                // alert('YO')
                // console.log(this.selected)
                // console.log(baru)
                this.$router.push({ path: '/dashboard/product/' + baru.id });
                // this.$router.push({ name: 'Detail' });
                // console.log(this.$route)
                // console.log(old)
            }
        }
    }
</script>

<style scoped>
    .is-left {
        float: left;
    }
</style>