const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');
// const path = require('path');
// const openBrowser = require('react-dev-utils/openBrowser');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    stats: 'errors-only', // 终端控制台只打印错误日志
    contentBase: './dist', // 本地服务器加载文件的目录
    port: '8088', // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, // 不跳转
    hot: true, // 热更新
    open: false, // 是否自动打开浏览器
    overlay: {
      errors: false,
    }, // 在编译过程中有错误，给予窗口提示
  },
  // devServer: {
  //   stats: 'errors-only', // 终端控制台只打印错误日志
  //   historyApiFallback: {
  //     index: '/public/index.html', // 所有的404都连接到index.html
  //   },
  //   // 在编译过程中有错误，给予窗口提示
  //   overlay: {
  //     errors: false,
  //   },
  //   compress: true, //压缩
  //   //dev-server引用的静态文件的路径
  //   // 启动后拷贝public下相关静态文件，后自动查找打包路径并引入相关打包文件
  //   contentBase: [
  //     path.join(__dirname, '..', 'public'),
  //     path.join(__dirname, '..', 'dist'),
  //   ],
  //   progress: true,
  //   open: false,
  //   host: 'localhost',
  //   port: '8088',
  //   compress: true,
  //   hot: true,
  //   // hotOnly: true, // HMR热更新
  //   after: () => {
  //     let url = `http://localhost:8088`;
  //     console.log(`\n${url}启动成功！`);
  //     console.log(`编译中，请稍后...`);
  //     openBrowser(url);
  //   },
  // },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
