module.exports = {
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
        target: 'https://yongge.outsrkem.top:443/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
