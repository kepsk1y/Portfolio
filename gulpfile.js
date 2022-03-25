const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

const less = require('gulp-less'); //<---- Change the name of the prep in brackets and after const

const cssFiles = [
   './src/less/main.less', //Need to changer the name of the file depending on preprocessor
   './src/less/media.less' //Need to changer the name of the file depending on preprocessor
]

const jsFiles = [
   './src/js/lib.js',
   './src/js/main.js'
]


function styles() {
   
   return gulp.src(cssFiles)
   
   .pipe(sourcemaps.init())

   .pipe(less()) //Change the preprocesoor

   .pipe(concat('style.css'))
   
   .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
   }))
   
   .pipe(cleanCSS({
      level: 2
   }))
   
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest('./build/css'))
   .pipe(browserSync.stream());
}

function lessfile() {
   pipe(sourcemaps.init())
   pipe(browserSync.stream());
}

function scripts() {
   
   return gulp.src(jsFiles)
   
   .pipe(concat('script.js'))
   
   .pipe(uglify({
      toplevel: true
   }))
   
   .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
}


function clean() {
   return del(['build/*'])
}


function watch() {
   browserSync.init({
      server: {
          baseDir: "./",
          googlechrome: '-browser "chrome.exe"'
      }
  });
  
  gulp.watch('./src/less/**/*.less', styles) //Change or add task for watching your prep file
  
  gulp.watch('./src/js/**/*.js', scripts)

  gulp.watch('./block/**/*.less', lessfile)

  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('lessfile', lessfile);

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('del', clean);

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));

gulp.task('dev', gulp.series('build','watch', 'lessfile'));