var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './dom_tree/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname),
    publicPath: '/'
  }
}