const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: '',
        vendor: ''
    },
    output: {
        path: path.resolve("../dist"),
        filename: "[filename].min.js"
    },
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }
        }
    ],
    devtool: "source-map",
    plugins: [
        new UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};