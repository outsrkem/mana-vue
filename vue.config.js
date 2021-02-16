const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  /** 开启gzip压缩，优化打包 */
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  },
  /** 开发环境代理 */
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://www.yonge.com:443/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
