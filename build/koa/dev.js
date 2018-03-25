const devMiddleware  = require('webpack-dev-middleware')
module.exports = (compiler, opts) => {
    const middleware = devMiddleware(compiler, opts)
    let nextFlag = false
    const nextFn = () => {
        nextFlag = true
    }
    let Dev = (ctx, next) => {
        middleware(ctx.req, {
            send: content => ctx.body = content,
            setHeader: (name, value) => ctx.set(name, value)
        }, nextFn)
        if (nextFlag) {
            nextFlag = false
            return next()
        }
    }
    Dev.fileSystem = middleware.fileSystem
    return Dev
}
