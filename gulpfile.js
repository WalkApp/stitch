var
  SYMLINKS,
  createSymlink,
  pkg = require('./package.json'),
  path = require('path'),
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  rename = require('gulp-rename'),
  nodemon = require('gulp-nodemon'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  symlink = require('gulp-symlink'),
  jscs = require('gulp-jscs'),
  through2 = require('through2');


SYMLINKS = {
  'config': './config > node_modules',
  'libs': './libs > node_modules'
};

createSymlink = function (key, path) {
  path = path.split('>');
  gulp
    .src(path[0].trim())
    .pipe(symlink(path[1].trim() + '/' + key, { force: true }));
};

gulp.task('jscs', function () {
  gulp
    .src(['client/**/*.js'])
    .pipe(jscs())
    // hook to check over than 16 files
    // see https://github.com/jscs-dev/gulp-jscs/issues/22
    .pipe(through2.obj(function(file, encoding, callback) {
      callback();
    }));
});

gulp.task('symlink', function () {
  for (var key in SYMLINKS) {
    createSymlink(key, SYMLINKS[key]);
  };
});

gulp.task('server', function () {
  nodemon({
    script: 'server/index.js',
    exec: 'babel-node',
    ignore: ['client/**/*.*', 'public/**/*.*', 'node_modules/**/*.*']
  });
});

gulp.task('js', function () {
  var bundle = browserify({
    entries: ['./client/index.js'],
    paths: ['./node_modules']
  });

  bundle.exclude('underscore');
  bundle.require('lodash', { expose: 'underscore' });
  bundle.require('./config/client', { expose: 'config' });
  bundle.require('./config/langs/client', { expose: 'config/langs' });

  bundle.bundle()
    .on('error', function (err) { console.log(err.message) })
    .pipe(source('script.js'))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('css', function () {
  gulp.src('./stylesheets/index.styl')
    .pipe(stylus({
      'paths': [path.join(__dirname, '/node_modules')],
      'include css': true,
      'use': [nib()],
      'urlfunc': 'embedurl',
      'linenos': true,
      'define': {
        '$version': pkg.version
      }
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('watch', function () {
  gulp.watch('./stylesheets/**/*.styl', ['css']);
  gulp.watch('./client/**/*.js', ['js']);
});

gulp.task('dev', ['server', 'js', 'css', 'watch']);
