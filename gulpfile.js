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
    return src('script.js')
    // The gulp-uglify plugin won't update the filename
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '-' + date + '.min.js' }))
    .pipe(uglify())
    .pipe(dest('./public'));
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
  return src('*.css')
    .pipe(cleanCSS())
    .pipe(replace(/(@import.*?)\.css'/g, "$1-" + date + ".min.css'"))
    .pipe(rename({ extname: '-' + date +'.min.css' }))
    .pipe(dest('./public/'));
}

function copy() {
  return merge([
    src('./img/**').pipe(dest('./public/img')),
    src('./ios/**').pipe(dest('./public/ios')),
    src('./android/**').pipe(dest('./public/android')),
    src('./screenshots/**').pipe(dest('./public/screenshots')),
    src('./manifest.json').pipe(dest('./public')),
    src('./favicon.ico').pipe(dest('./public')),

  ])
}


exports.default = series(handleJs, handleCss, handlePages, copy);

