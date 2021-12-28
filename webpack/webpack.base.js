const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css文件

const NODE_ENV = process.env.NODE_ENV; // 环境状态

module.exports = {
  entry: {
    index: './src/index.js',
  }, // 入口文件 可以配置多入口
  output: {
    path: path.join(__dirname, '../dist'), // 打包后的文件存放的地方
    filename: './static/js/[name].js', // 打包后输出文件的文件名
    chunkFilename: './static/js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // 路径简写
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
      pages: path.resolve(__dirname, '../src/pages'),
    },
  },
  devtool: 'cheap-module-eval-source-map', // 方便调试
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
        exclude: /node_modules/, // 不转译node_modules里面的文件
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
