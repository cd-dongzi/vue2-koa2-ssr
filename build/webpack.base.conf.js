const path = require('path')
const webpack = require('webpack')
const baseConfig = require('../config').base
const vueConfig = require('./vue-loader.conf.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, '../code/client/', dir)
const assetsPath = dir => path.posix.join(baseConfig.assetsPath, dir)

module.exports = {
    mode: isProd ? 'production':'development',
    output: {
        path: baseConfig.path,
        publicPath: baseConfig.publicPath,
        filename: '[name]-[chunkhash].js'
    },
    //配置模块如何被解析
    resolve: {
        //自动解析文件扩展名(补全文件后缀)(从左->右)
        // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
        extensions: [".js", ".vue", ".json"],

        //配置别名映射
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': resolve('src'),
            'components': resolve('src/components'),
            'assets': resolve('src/assets'),
            'views': resolve('src/views'),
            'store': resolve('src/store')
        }
    },
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    module: {
        rules: [
            {
                test: /\.js$/, //资源路径
                loader: 'babel-loader', //该路径执行的loader
                include: resolve("src") //指定哪个文件loader
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve("src"),
                options: vueConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        // 抽离css
        new ExtractTextPlugin({
            filename: assetsPath('css/[name].[contenthash].css')
        })
    ]
}
