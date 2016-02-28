var path = require('path');
var webpack = require("webpack");
// var args = require('node-args'); // 能读取运行时传入的参数
var env = process.env.NODE_ENV;

var config = {

    entry: {
        app: "./app/scripts/app.js",
        admin: "./admin/app.js"
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
            loader: 'url?limit=10000'
        }, {
            test: /\.css$/,
            loaders: ['style', 'css', 'autoprefixer?{browsers:["last 2 version", "Firefox 15"]']
        }, {
            test: /\.scss/,
            loader: 'style!css!sass?config=otherSassLoaderConfig!autoprefixer?{browsers:["iOS 7", "Android 4.3"]}'
        }, 
        // {
        //     test: /\.js$/,
        //     include: /(app|admin)/, // 包含处理文件
        //     exclude: /(node_modules|bower_components)/, // 排除load处理文件
        //     loader: 'babel',
        //     query: {
        //         presets: ['es2015']
        //     }
        // }, 
        {

            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
        
        }]
    },

    devServer: {
        contentBase: 'app/',
        host: '192.168.1.101',
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
