var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};