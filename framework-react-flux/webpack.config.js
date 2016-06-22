/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
// css单独引入
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 脚本引入
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取公共脚本
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    index: path.resolve('public', 'index.js')
  },
  //devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  //devtool: false,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    hash: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: [ 'es2015', 'react', 'stage-0']
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    }/*, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
    }*/, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less?sourceMap')
      //loader: 'style!css!less'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=32768'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors.js'),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('public', 'index.html'),
      inject: 'body',
      chunks: ['vendors.js', 'index']
    })
  ]
};
