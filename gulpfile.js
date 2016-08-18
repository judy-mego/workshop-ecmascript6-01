var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var watchify    = require('watchify');
var babel       = require('babelify');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

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

    gulp.watch(paths.src+'/*.html', ['copy-html']).on('change', browserSync.reload);
    gulp.watch(paths.dist+'/*').on('change', browserSync.reload);
});

function compile(watch) {
    var bundler = watchify(browserify(paths.src+'/assets/js/app.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist+'/assets/js'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
            browserSync.reload();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('copy-html', function(done) {
    return gulp.src([paths.src+'/*.html'])
        .pipe(gulp.dest(paths.dist+'/'));
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });
