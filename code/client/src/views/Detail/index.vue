<template>
    <div>
        <article class="detail" v-if="movieDetail">
            <h1>{{movieDetail.title}}</h1>
            <div class="directors">
                导演：
                <span class="s" v-for="v in movieDetail.directors"><a :href="v.alt" :alt="v.alt">{{v.name}}</a></span>
            </div>
            <div class="casts">
                主演：
                <span class="s" v-for="v in movieDetail.casts"><a :href="v.alt" :alt="v.alt">{{v.name}}</a></span>
            </div>
            <div class="types">
                类型：
                <span v-for="v in movieDetail.genres">{{v}}</span>
            </div>
            <div class="countries">
                国家：
                <span v-for="v in movieDetail.countries">{{v}}</span>
            </div>
            <small>剧情简介：</small>
            <p>{{movieDetail.summary}}</p>
        </article>
        <article v-else>
            <h2 style="text-align: center">暂无数据</h2>
        </article>
        <button type="button" @click="$router.back()">返回</button>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        asyncData ({store, route}) {
            return store.dispatch('getMovieDetail', route.params.id)
        },
        created () {
            console.log(444)
        },
        computed: {
            ...mapGetters(['movieDetail'])
        }
    }
</script>

<style lang="less" scoped>
    .directors, .casts, .types, .countries {
        width: 350px;
        overflow:hidden;
        word-wrap:normal;
        white-space:nowrap;
        text-overflow:ellipsis;
        span:not(:last-child) {
            &:after {
                content: '/';
                margin: 0 2px;
                color: #999;
            }
        }
        .s:not(:last-child) {
            a {
                text-decoration: none;
            }
        }
    }
    button {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: block;
        
    }
</style>