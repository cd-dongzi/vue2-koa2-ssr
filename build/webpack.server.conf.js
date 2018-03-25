const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const styleLoader = require('./style-loader')
const baseConf = require('../config').base
const baseConfig = require('./webpack.base.conf')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const isProd = process.env.NODE_ENV === 'production'

const assetsPath = dir => path.posix.join(baseConf.assetsPath, dir)
module.exports = merge(baseConfig, {
    
    mode: isProd ? 'production':'development',

    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
    devtool: '#source-map',
    entry: path.resolve(__dirname, '../code/client/src/entry-server.js'),

    module: {
        rules: styleLoader.styleLoader({
            extract: isProd,
            sourceMap: isProd
        })
    },

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),

        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json
        new VueSSRServerPlugin()
    ]
})