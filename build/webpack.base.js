const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (mode) => {
  const build = mode !== 'development'
  return {
    // entry: ['react-hot-loader/patch', './src/index.js'],
    entry: ['./src/index.tsx'],
    output: {
      filename: 'js/[name].js',
      path: path.join(__dirname, '../dist'), // must be absolute path
      chunkFilename: 'js/[name]_[hash:6].js',
      publicPath: '/' // filename for html reference: prefix path => js/main.js
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$|\.scss$/i,
          use: [
            build && MiniCssExtractPlugin.loader,
            !build && 'style-loader',
            {
              loader: 'css-loader'
              // options: {
              //   modules: {
              //     auto: /src/,
              //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
              //   }
              // }
            },
            { loader: 'postcss-loader' }
          ].filter(Boolean)
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: 'img/[name]_[hash:6].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      build &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[chunkhash:8].css',
          chunkFilename: 'css/[name].[chunkhash:8].css'
        }),
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ].filter(Boolean)
  }
}
