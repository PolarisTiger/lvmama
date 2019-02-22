const gulp = require('gulp')
const webserber = require('gulp-webserver')
const watch = require('gulp-watch')
const pathUtil = require('path')
const sass = require('gulp-sass')
const del = require('del')
const webpack = require('webpack-stream')

const {
    severConfig,
    webapackConfig
} = require('./config')

// 迁移static资源
gulp.task('copy-static',() => {
    return gulp.src('src/static/**/*')
            .pipe(gulp.dest('dist/static'))
})

// 迁移html资源
gulp.task('copy-html', () => {
    return gulp.src('src/*.html')
            .pipe(gulp.dest('dist/'))
})

// 编译ssass
gulp.task('compile-sass', () => {
    return gulp.src('src/stylesheets/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('dist/stytlesheets'))
})

// 打包js
gulp.task('pack-js', () => {
    return gulp.src('src/javascripts/**/*')
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest('dist/javascripts'))
})

// server
gulp.task('server',() => {
    return gulp.src('dist')
            .pipe(webserver(serverConfig))
})

// watch
gulp.task('watch', () => {
    gulp.watch('src/*.html',['copy-html'])
    gulp.watch('srcc/stylesheets/**/*.scss',['compile-sass'])
    gulp.watch('src/javascripts/**/*',['pack-js'])
    
    // watch static
    watch('src/static/**/*', (v) => {
        if (v.events === 'unlink'){
            let _path = pathUtil.resolve('dist/static/',v.path.split('\\static\\')[1])
            del(_path)
        }else{
            //如果是新增和更改，就将静态资源直接再次输出到dist的打包路径
            gulp.start(['copy-static'])
        }
    })
})


gulp.task('default',
    [
        'copy-static',
        'copy-html',
        'compile-sass',
        'pack-js',
        'watch',
        'server'
    ],
    () => {console.log('running!')}
)
