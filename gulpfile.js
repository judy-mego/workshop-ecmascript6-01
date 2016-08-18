var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var watchify    = require('watchify');
var babel       = require('babelify');

var paths = {
    src : './src',
    dist : './www'
};

/// Server static browser-sync

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });

    gulp.watch(paths.dist+'/*').on('change', browserSync.reload);
});
