/*
* @Author: dmyang
* @Date:   2015-06-16 15:19:59
* @Last Modified by:   dmyang
* @Last Modified time: 2016-03-28 10:27:11
*/

'use strict';

let gulp = require('gulp')
let webpack = require('webpack')

let gutil = require('gulp-util')

let webpackConf = require('./webpack.config')
// let webpackDevConf = require('./webpack-dev.config')

let src = process.cwd() + '/src'
let assets = process.cwd() + '/assets'

// js check
gulp.task('hint', () => {
    let jshint = require('gulp-jshint')
    let stylish = require('jshint-stylish')

    return gulp.src([
            '!' + src + '/js/lib/**/*.js',
            src + '/js/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
})


gulp.task('lint', function() {  
    let eslint = require('gulp-eslint');  
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
        .pipe(eslint.results(function (results) {
        // Called once for all ESLint results.
        console.log('Total Results: ' + results.length);
        console.log('Total Warnings: ' + results.warningCount);
        console.log('Total Errors: ' + results.errorCount);
    }));
});

// clean assets
gulp.task('clean', ['hint'], () => {
    let clean = require('gulp-clean')

    return gulp.src(assets, {read: true}).pipe(clean())
})

// run webpack pack
gulp.task('pack', ['clean'], (done) => {
    webpack(webpackConf, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({colors: true}))
        done()
    })
})

// html process
gulp.task('default', ['pack'])
/*gulp.task('default', ['pack'], () => {
    let replace = require('gulp-replace')
    let htmlmin = require('gulp-htmlmin')

    return gulp
        .src(assets + '/*.html')
        // @see https://github.com/kangax/html-minifier
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(assets))
})*/

// deploy assets to remote server
gulp.task('deploy', () => {
    let sftp = require('gulp-sftp')

    return gulp.src(assets + '/**')
        .pipe(sftp({
            host: '[remote server ip]',
            remotePath: '/www/app/',
            user: 'foo',
            pass: 'bar'
        }))
})
