import {createApp} from './app'
const isDev = process.env.NODE_ENV !== 'production'
export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
      // 以便服务器能够等待所有的内容在渲染前，
      // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()

        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url && fullPath !== '/404') {
            return reject({ url: fullPath })
        }
        // 设置服务器端 router 的位置
        router.push(url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map( ({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then( () => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                context.state = store.state
                resolve(app)
            }).catch(reject)
            
            // resolve(app)
        })
    })
}
