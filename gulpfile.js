var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var babelify = require('babelify');

var paths = {
    js: ['src/js/**/*.js'],
    sass: ['src/css/**/*.scss'],
    static: ['src/html/**/*']
};

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        livereload: false
    });
});

gulp.task('browserify', function() {

    gulp.src('src/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify'],
    }))    
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
    gulp.src('src/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('static', function() {
    gulp.src('src/html/**/*')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
    gulp.watch(paths.js, ['browserify']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.static, ['static']);
})

gulp.task('dev', ['default', 'connect', 'watch'])
gulp.task('default', ['sass', 'browserify', 'static']);