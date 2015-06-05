var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    connect = require('gulp-connect'),
    _       = require('underscore');


gulp.task('js-library', function () {
    return gulp.src([
        'libs/lodash/lodash.js',
        'libs/pixi.js/bin/pixi.js',
        'libs/gl-matrix/src/gl-matrix/common.js',
        'libs/gl-matrix/src/gl-matrix/vec2.js'
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))

});


gulp.task('js', function () {
    return gulp.src([
        'src/js/game.js',
        'src/js/keyboard.js',
        'src/js/bullet.js',
        'src/js/bunny.js'
    ])
        .pipe(concat('game.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('game.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 9000
    });
});

gulp.task('css', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [__dirname + '/dist/bower_components/compass-mixins/lib/']
        }))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('server-files', function () {
    return gulp.src([
        'dist/css/**/*.css',
        'dist/js/**/*.js'
    ]).pipe(connect.reload());
});


gulp.task('watch:js', function () {
    gulp.watch('src/js/**/*.js', ['js', 'server-files']);
});

gulp.task('watch:css', function () {
    gulp.watch('src/sass/**/*.scss', ['css', 'server-files']);
});

gulp.task('watch', ['watch:css', 'watch:js']);

gulp.task('default', ['connect', 'watch']);


