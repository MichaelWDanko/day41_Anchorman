var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var deploy = require('gulp-gh-pages');

gulp.task('default', ['html', 'sections', 'js', 'css', 'imgs']);

gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./public'));
});
gulp.task('sections', function() {
    return gulp.src('./sections/*.html')
        .pipe(gulp.dest('./public/sections/'));
});

gulp.task('css', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    return gulp.src('./js/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('imgs', function() {
    return gulp.src('./images/*')
        .pipe(gulp.dest('./public/images'));
});

gulp.task('watch', function() {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./sections/*.html', ['sections']);
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('deploy', function() {
    return gulp.src("./public/**/*")
    .pipe(deploy());
});
