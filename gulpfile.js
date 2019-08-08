const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

//compile sass

gulp.task('sass', function(){
    return gulp.src(['styles/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('styles/css'))
        .pipe(browserSync.stream());
})

// watch & serve
gulp.task("serve", gulp.series(["sass"], function (){
    browserSync.init({
        server: ""
    });

    gulp.watch(["styles/sass/*.scss"], gulp.series(["sass"]));
    gulp.watch(["*.html"]).on("change", browserSync.reload);
}));

// html-min

gulp.task('htmlmin', function(){
    return gulp.src('index.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('prod'));
  });

 // css-min
 
 gulp.task('minify-css', function(){
    return gulp.src('styles/css/style.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('prod/css'));
  }); 

// default task
gulp.task("default", gulp.series(["serve"]));
 
