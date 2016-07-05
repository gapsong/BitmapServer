var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

var dirname = '/';

var paths = {
    apps: ['src/apps/desktop/main.js'],
    dist: 'src/public/dist'
}

gulp.task('develop', function() {
    nodemon({
            script: 'server.js',
            ext: 'html js json',
            ignore: paths.dist + '/**'
        })
        .on('start', ['browserify'])
        .on('restart', ['browserify'], function() {
            console.log('restarted!');
        });
});

gulp.task('browserify', function() {
    gulp.src(paths.apps)
        .pipe(browserify({
            transform: 'reactify'
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('default', ['develop']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
