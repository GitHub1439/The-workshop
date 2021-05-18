module.exports = {
    lintOnSave: false,
    publicPath: "./",
    outputDir: process.env.outputDir,
    devServer: {
        open: process.platform === 'vue',
        // host: '127.0.0.1',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: { // 设置代理
            '/requestApi/*': {
                // target: 'http://192.168.0.137:8079/',
                target: 'http://study.hnedu123.cn:8084/',
                changeOrigin: true,
                pathRewrite: {
                    '^/requestApi': 'http://study.hnedu123.cn:8084/'
                }
            },
            '/fileApi/*': {
                target: 'http://fs.hnedu.cn/',
                // target: 'http://wj.hnedu123.cn/',
                // target: 'http://fs.hnedu.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/fileApi': 'http://fs.hnedu.cn/'
                }
            }
        },
        disableHostCheck: true
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}