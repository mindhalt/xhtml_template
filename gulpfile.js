'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    less = require('gulp-less'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    html: {
        src: 'templates/*.html',
        dest: './',
        watch: 'templates/**/*.html'
    },
    css: {
        src: 'css/less/styles.less',
        dest: 'css/',
        watch: 'css/less/*.less'
    }
};

var config = {
    server: {
        baseDir: "./",
    },
    open: false,
    tunnel: false,
    host: "ukr-agro-product",
    port: 9000,
    logPrefix: "UAP"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('reload_webserver', function () {
    var stream = gulp.src(path.css.src)
        .pipe(reload({stream: true}));

    return stream;
});

gulp.task('css', function () {
    var stream = gulp.src(path.css.src)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(path.css.dest))
    .pipe(reload({stream: true}));

    return stream;
});

gulp.task('html', function () {
    var stream = gulp.src(path.html.src)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.html.dest))
    .pipe(reload({stream: true}));

    return stream;
});

gulp.task('watch', function(){
    gulp.watch(path.css.watch, ['css']);
    gulp.watch(path.html.watch, ['html']);
});

gulp.task('build', ['css', 'html']);

gulp.task('default', ['build', 'webserver', 'watch']);