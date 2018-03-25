"use strict"
const path = require('path')
const webpack = require('webpack')
const styleLoader = require('./style-loader')
const devConf = require('../config').dev  //开发环境配置参数
const baseConf = require('./webpack.base.conf') //webpack基本配置

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge")
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
//发送系统通知的一个node模块！
const notifier = require("node-notifier")

const dev = merge(baseConf, {
    mode: 'development',
    module: {
        rules: styleLoader.styleLoader({ extract: false, sourceMap: true })
    },

    //生成sourceMaps(方便调试)
    devtool: devConf.devtoolType,

    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),

        //显示模块相对路径
        new webpack.NamedModulesPlugin(),

        //配置html入口信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../code/client/index.html'),
            inject: true
        }),

        //编译提示插件
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http:`],
            },
            onErrors: function (severity, errors) {
                if (severity !== "error") {
                    return
                }
                const error = errors[0]
                const filename = error.file.split("!").pop()
                // console.log(filename)
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "blog",
                    message: severity + ": " + error.name,
                    subtitle: filename || ""
                })
            }
        })


    ]
})

module.exports = dev