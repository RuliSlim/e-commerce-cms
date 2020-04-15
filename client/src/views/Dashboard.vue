<template>
    <section class="container">
        <b-button type="is-success" class="is-left" outlined
         @click="showAdd">Add Product</b-button>

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
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="user.last_name" label="Price" sortable>
                    {{ props.row.price }}
                </b-table-column>

                <b-table-column field="user.last_name" label="Stock" sortable>
                    {{ props.row.stock }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
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
                url: 'http://localhost:3000/products'
            }
        },
        mounted(){
            this.$store.dispatch('getProducts')
                .then(() => {
                    this.data = this.$store.state.products;
                })
                .catch(err => console.log(err));
        },
        methods: {
            showAdd() {
                this.$router.push({ path: '/create'})
            }
        }
    }
</script>

<style scoped>
    .is-left {
        float: left;
    }
</style>