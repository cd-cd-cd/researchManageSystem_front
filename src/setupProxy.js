const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/api',    // 指定需要转发的请求
        createProxyMiddleware({
            target: 'http://localhost:80',
            changeOrigin: true,
            pathRewrite(path) {
                return path.replace('/api', '')
            }
        })
    );
}