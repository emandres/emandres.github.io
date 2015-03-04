var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function() {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass-min', ["sass"], function() {
  gulp.src('./css/*.css')
    .pipe(minifyCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./css'));
});
