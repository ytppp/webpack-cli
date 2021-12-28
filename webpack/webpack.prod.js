const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //打包前清除dist目录文件
const WebpackBar = require('webpackbar'); // 打包进度展示
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
      },
    ]),
    new CleanWebpackPlugin(),
    new ParallelUglifyPlugin({
      // 本质还是调用UglifyJs，变成多线程并行压缩。（webpack内置UglifyJs压缩）
      workerCount: 3, // 线程数，推荐: 内核数目-1
      sourceMap: false,
      cacheDir: '.cache/', // 设置缓存路径，不改动的调用缓存，第二次及后面build时提速
      test: /\.js(\?.*)?$/i,
      exclude: /\/node_modules/,
      maxSize: 500,
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
          */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false,
        },
        compress: {
          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: false,
          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
          collapse_vars: false,
          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          reduce_vars: false,
        },
        /*
           是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
           不大的警告
          */
        warnings: false,
      },
    }),
    new WebpackBar(),
    new HardSourceWebpackPlugin(),
  ],
});
