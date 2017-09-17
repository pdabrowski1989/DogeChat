const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');


gulp.task('saas', () => {
    return gulp.src('./app/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', () => {
    return gulp.src('./app/**/*.js')
        .pipe(babel({presets: ['env']}))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('build', ['js', 'saas']);

gulp.task('watch', () => {
    return gulp.watch(['./index.html', './app/**/*.html', './app/**/*.scss', './app/**/*.js'], ['build']);
});

gulp.task('serve', ['watch', 'build'], () => {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});
