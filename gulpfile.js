const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS
function style() {
    return gulp.src('./assets/scss/**/*.scss') // Path ke file SCSS
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css')) // Output ke folder CSS
        .pipe(browserSync.stream());
}

// Watch for changes and reload browser
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

// Default task
exports.style = style;
exports.watch = watch;