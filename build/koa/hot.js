const hotMiddleware = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough

module.exports = (compiler, opts) => {
    const middleware = hotMiddleware(compiler, opts)
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
}
