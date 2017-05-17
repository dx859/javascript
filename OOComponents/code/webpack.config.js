var path = require('path');
var webpack = require("webpack");
// var args = require('node-args'); // 能读取运行时传入的参数
var env = process.env.NODE_ENV;

var config = {

    entry: {
        dialog: "./OOComponents/dialog/main.js"
    },
    plugins: [

    ],

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/', // 如果用到sever就需要设置publicPath，设置在内存中的映射路径
        filename: "[name].bundle.js"
    },
    module: {
        noParse: [/jquery/, /angular/], // 不用解析jquery, angular中的require或者import
        loaders: [{
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            loader: 'url?limit=10000'
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'autoprefixer?{browsers:["iOS 7", "Android 4.3"]}']
        }, {
            test: /\.scss/,
            exclude: /node_modules/,
            loader: 'style!css!sass?config=otherSassLoaderConfig!autoprefixer?{browsers:["iOS 7", "Android 4.3"]}'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015']
        }]
    },

    devServer: {
        contentBase: 'OOComponents/',
        host: 'localhost',
        port: '8000'
    },

    otherSassLoaderConfig: {
        outputStyle: 'compressed'
    }



};

if (env == 'production') {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
}

module.exports = config;
