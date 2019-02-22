const proxy = require('http-porxy-middleware')

const serverConfig = {
    liverelaod: {
        enable: true
    },
    directoryListing: false,
    open: false,
    port:3000,
    middleware: [
        proxy('/maoyan',{
            target: 'http://m.maoyan.com',
            changeOrigin: true,
            pathRewrite: {
                '^maoyan': ''
            }
        }),

        proxy('/mz',{
            target: 'https://m.maizuo.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/mz': ''
            }
        }),
    ],
    proxies: [
        //{ source: '/api' , target: ''}
    ]
}

module.exports = serverConfig