var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var babelify = require('babelify');
var browserify = require('browserify');


gulp.task('build', ['build-js']);
gulp.task('build-js', buildJs);
gulp.task('watch', ['build-js'], watch);
gulp.task('default', ['watch']);


function buildJs(done) {
  log('building...');

  var bundler = browserify('./src/index.js', { debug: true }).transform(babelify);
  bundler
    .bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'))
    .on('end', () => {
      log('\x07done\n');
      done();
    });

  function log(out) {
    process.stdout.write(out);
  }
}


function watch() {
  gulp.watch('./src/**/*.js', ['build-js']);
}
