<template>
    <li class="item">
        <h2 @click="getDetail"><span>{{item.title}}</span> <small>{{item.original_title}}</small><span class="year">（{{item.year}}）</span></h2>
        <div class="item-l" @click="getDetail">
            <div class="movie-cover" :style="{backgroundImage: `url(${item.images.small})`}"></div>
        </div>
        <div class="item-r">
            
            <div class="directors">
                导演：
                <a v-for="v in item.directors" :href="v.alt" :alt="v.alt">{{v.name}}</a>
            </div>
            <div class="casts">
                主演：
                <a v-for="v in item.casts" :href="v.alt" :alt="v.alt">{{v.name}}</a>
            </div>
            <div>评分：{{item.rating.average}}</div>
            <div class="types">
                类型：
                <em v-for="v in item.genres">{{v}}</em>
            </div>
        </div>
    </li>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                require: true
            }
        },
        methods: {
            getDetail () {
                this.$router.push(`/movie/${this.item.id}`)
            }
        }
    }
</script>
<style lang="less" scoped>
    .item {
        overflow: hidden;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        h2 {
            >*{
                display: inline-block;
                vertical-align: middle;
            }
            .year {
                color: #888;
            }
        }
        .item-l, .item-r {
            float: left;
        }
        .movie-cover {
            width: 150px;
            height: 200px;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;  
            background-color: #ccc;
        }
        .item-r {
            height: 200px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            margin-left: 20px;
            .types {
                em {
                    margin-right: 5px;
                }
            }
            .directors, .casts {
                width: 350px;
                overflow:hidden;
                word-wrap:normal;
                white-space:nowrap;
                text-overflow:ellipsis;
                a:not(:last-child) {
                    &:after {
                        content: '/';
                    }
                }
            }
        }
    }
</style>