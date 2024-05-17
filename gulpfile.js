const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const merge = require("merge-stream");

const date = Date.now();

function handleJs() {
    // place code for your default task here
    return src('./scripts/*.js')
    // The gulp-uglify plugin won't update the filename
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '-' + date + '.min.js' }))
    .pipe(uglify())
    .pipe(dest('./public/scripts'));
}

function handlePages() {
  return src('./*.html')
    .pipe(replace(/(src="(?!(http)|(\/libraries)).*?)\.js"/g, '$1-' + date + '.min.js"'))
    .pipe(replace(/(href="(?!(http)|(\/libraries)).*?)\.css"/g, '$1-' + date + '.min.css"'))
    .pipe(htmlmin({
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(dest('./public/'));
}

function handleCss() {
  return src('./css/*.css')
    .pipe(cleanCSS())
    .pipe(replace(/(@import.*?)\.css'/g, "$1-" + date + ".min.css'"))
    .pipe(rename({ extname: '-' + date +'.min.css' }))
    .pipe(dest('./public/css'));
}

function copy() {
  return ChannelMergerNode([
    gulp.src('./img/**').pipe(gulp.dest('./public/img')),
    gulp.src('./ios/**').pipe(gulp.dest('./public/ios')),
    gulp.src('./android/**').pipe(gulp.dest('./public/android')),
    gulp.src('./screenshots/**').pipe(gulp.dest('./public/screenshots')),
    gulp.src('./manifest.json').pipe(gulp.dest('./public/manifest.json')),

  ])
}


exports.default = series(handleJs, handleCss, handlePages, copy);

