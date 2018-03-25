import path from 'path'
import bodyParser from 'koa-bodyparser'
import staticFiles from 'koa-static'
import compress from 'koa-compress'
export default app => {
    app.use(async (ctx, next) => { 
        if (ctx.url == '/favicon.ico') return
        await next()
    })
    
    //gzip压缩
    app.use(compress())

    //post请求中间件
    app.use(bodyParser())
    
    //静态文件中间件
    app.use(staticFiles(path.resolve(__dirname, '../../../public')))
}