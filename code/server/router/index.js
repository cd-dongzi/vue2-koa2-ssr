import koaRouter from 'koa-router'
import path from 'path'
import fs from 'fs'
import request from 'superagent'
const router = koaRouter()





export default app => {
    router.get('/getMovieList', async (ctx, next) => {
        ctx.body = require('./movies.json')
    })

    router.get('/getMovieDetail', async (ctx, next) => {
        let {id} = ctx.request.query
        const data = new Promise( (resolve, reject) => {
            request.get('http://api.douban.com/v2/movie/subject/'+id)
                .then( res => {
                    resolve(res.body)
                }).catch( e => {
                    console.log(e)
                    reject(e)
                })
        })
        ctx.body = await data
    })
    app.use(router.routes()).use(router.allowedMethods())
}

