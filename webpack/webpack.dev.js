const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');
const path = require('path');
// const openBrowser = require('react-dev-utils/openBrowser');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    stats: 'errors-only', // 终端控制台只打印错误日志
    contentBase: path.resolve(__dirname, 'public'), // 本地服务器加载文件的目录
    port: '8088', // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true, // 热更新
    open: false, // 是否自动打开浏览器
    overlay: {
      errors: false,
    }, // 在编译过程中有错误，给予窗口提示
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
