module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/api*': {
        // Forward frontend dev server request for /api to django dev server
        // target: 'http://localhost:8000/',  // This one works as wel since 127.0.0.1 == localhost for me.
        target: 'http://127.0.0.1:8000/',
      },
    },
  },
}
