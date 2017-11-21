const path = require('path')
const webpack = require('webpack')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = {
    entry: './src/smoothScroll.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'smoothScroll.min.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        }),
        new UnminifiedWebpackPlugin()
    ]
}
