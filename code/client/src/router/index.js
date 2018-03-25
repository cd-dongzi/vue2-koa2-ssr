import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' 
Vue.use(Router)
const routes = [
    {
        path: '/',
        component: resolve => require(['views/ItemList/index.vue'], resolve)
    },
    {
        path: '/movie/:id',
        component: resolve => require(['views/Detail/index.vue'], resolve)
    },
    {
        path: '/404',
        name: '404',
        component:resolve => require(['views/Error/NotFound.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new Router({
    mode: 'history',
    routes
})

if (typeof window !== "undefined") {
    router.beforeEach((to, from, next) => {
        NProgress.start()
        next()
    })
    router.afterEach((to, from) => {
        NProgress.done();
    })

}

export const createRouter = () => router
