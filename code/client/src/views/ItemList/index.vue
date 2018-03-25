<template>
    <div class="wrapper">
        <h1>TOP250</h1>
        <ul v-for="item in movieList">
            <Item :item="item"/>
        </ul>
    </div>
</template>
<script>
    import Item from 'components/Item'
    import {mapGetters} from 'vuex'
    export default {
        components: { Item },

        asyncData ({store}) {
            return store.dispatch('getMovieList')
        },
        computed: {
            ...mapGetters(['movieList'])
        }
    }
</script>