module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|ico)$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 2000,
        esModule: false
      }));
  }
}