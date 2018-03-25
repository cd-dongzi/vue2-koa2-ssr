import path from 'path'
import fs from 'fs'
import koaRouter from 'koa-router'
import LRU from 'lru-cache'
import {createBundleRenderer} from 'vue-server-renderer'

const router = koaRouter()
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)
const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign({}, options, {
        runInNewContext: false,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    }))
}
const renderData = (ctx, renderer) => {
    const context = {
        url: ctx.url
    }
    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err)
            }
            resolve(html)
        })
    })
}
export default app => {

    let renderer
    if (isProd) { // 生产环境直接获取
        const bundle = require('../../public/client/vue-ssr-server-bundle.json')
        const template = fs.readFileSync(resolve('../../public/client/index.html'), 'utf-8')
        // const clientManifest = require('../../public/client/vue-ssr-client-manifest.json')
        renderer = createRenderer(bundle, {
            template,
            // clientManifest
        })

    }else{ // 开发环境
        require('../../build/setup-dev-server.js')(app, (bundle, options) => {
            console.log('bundle callback..')
            renderer = createRenderer(bundle, options)
            console.log(renderer)
        })
    }


    router.get('*', async (ctx, next) => {
        // 提示webpack还在工作
        if (!renderer) {
            ctx.type = 'html'
            return ctx.body = 'waiting for compilation... refresh in a moment.';
        }
        const s = Date.now()
        let html,status
        try {
            html = await renderData(ctx, renderer)
        }catch(e) {
            if (e.code === 404) {
                status = 404
                html = '404 | Not Found'
            }else{
                status = 500
                html = '500 | Internal Server Error'
                console.error(`error during render : ${ctx.url}`)
            }
        }
        ctx.type = 'html'
        ctx.status = status ? status : ctx.status
        ctx.body = html
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })

    app.use(router.routes()).use(router.allowedMethods());
}