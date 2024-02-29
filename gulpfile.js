var batch = require('gulp-batch');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var dirSync = require('gulp-dir-sync');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('sass', function() {
    gulp.src('./dev/sass/*.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('jshint', function() {
    gulp.src(['dev/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }));
});

gulp.task('js', function() {
    gulp.src([
            'dev/js/modules/app.js',
            'dev/js/modules/*.js',
            'dev/js/services/*.js',
            'dev/js/controllers/*.js',
            'dev/js/directives/*.js',
            'dev/js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('application.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'));
});
gulp.task('jsutils', function() {
    gulp.src([
            'dev/js/utils/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js/ext'));
});

gulp.task('js_production', function() {
    gulp.src([
            'dev/js/modules/app.js',
            'dev/js/modules/*.js',
            'dev/js/services/*.js',
            'dev/js/controllers/*.js',
            'dev/js/directives/*.js',
            'dev/js/*.js'
        ])
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false,
            compress: false
        }))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('minify', function() {
    return gulp.src('dev/partials/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('public/partials/'));
});
gulp.task('watch', ['sass', 'js', 'jshint', 'jsutils', 'minify'], function() {
    gulp.watch('dev/**/*.js', ['jshint']);
    gulp.watch('dev/js/utils/*.js', ['jsutils']);
    gulp.watch('dev/**/*.js', function() {
        gulp.start('js');
    });
    gulp.watch("dev/**/*scss", function() {
        gulp.start('sass');
    });
    gulp.watch('dev/partials/*.html', function() {
        gulp.start('minify');
    });
});

gulp.task('production', ['sass_production', 'jshint', 'js_production']);

gulp.task('default', ['sass', 'jshint', 'js', 'jsutils', 'minify', 'watch']);
