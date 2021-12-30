const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将js 或者 css 文件可以自动引入到指定的 Html 中
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css文件

console.log('process.env.NODE_ENV=', process.env.NODE_ENV); // 打印环境变量

const NODE_ENV = process.env.NODE_ENV; // 环境状态

const config = {
  entry: {
    index: './src/index.js',
  }, // 入口文件 可以配置多入口
  output: {
    path: path.join(__dirname, '../dist'), // 打包后的文件存放的地方
    filename: './static/js/[name].js', // 打包后输出文件的文件名
    chunkFilename: './static/js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // 路径简写
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
      pages: path.resolve(__dirname, '../src/pages'),
    },
  },
  devtool: 'cheap-module-eval-source-map', // 方便调试
  module: {
    // loader的作用就是将Webpack不认识的内容转化为认识的内容
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        exclude: /node_modules/, // 不转译node_modules里面的文件
      },
      {
        test: /\.css$/, // 解析样式
        use: [
          NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(c|sc|sa)ss$/, // 解析样式
        use: [
          NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/, // less
        use: [
          NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 启用内联JavaScript
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/, // 正则匹配图片格式名
        use: [
          {
            loader: 'url-loader', // 使用url-loader
            options: {
              limit: 9000, // 小于9k，采用url-loader直接转换成base64;大于8k，走file-loader
              name: '[name].[hash:8].[ext]',
              outputPath: './static/images/',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 配了url-loader就不配图片正则
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
            outputPath: './static/font/',
          },
        },
      },
    ],
  },
  plugins: [
    // 插件的作用，贯穿webpack打包的生命周期，执行不同的任务
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    // 样式分离
    new MiniCssExtractPlugin({
      filename: './static/css/[name].[chunkhash:8].bundle.css',
      chunkFilename: './static/css/[name].[chunkhash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
module.exports = (env, argv) => {
  console.log('argv.mode=', argv.mode); // 打印 mode(模式) 值
  return config;
};
