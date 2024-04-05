const path = require('path');
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        //配置代理
        target: "http://127.0.0.1:8833", // 注意！此处为后端提供的真实接口
        changeOrigin: true, // 允许跨域
        //pathRewrite: { "^/api": "" },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
    }
  }
};