const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isProd = process.env.NODE_ENV === 'production'
let config = isProd ? require('./webpack.prod.conf.js') : require('./webpack.dev.conf.js')



module.exports = merge(config, {
    mode: isProd ? 'production':'development',
    entry: {
    	app: path.resolve(__dirname, '../code/client/src/entry-client.js')
    },
    plugins: [
		new VueSSRClientPlugin()
    ]
})