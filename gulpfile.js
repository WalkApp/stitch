var
  SYMLINKS,
  createSymlink,
  proxy,
  compileJs,
  compileCss,
  startServer,
  _ = require('lodash'),
  pkg = require('./package.json'),
  path = require('path'),
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  symlink = require('gulp-symlink'),
  jscs = require('gulp-jscs'),
  through2 = require('through2'),
  exec = require('child_process').exec;


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

proxy = function (runner, callback) {
  runner.stdout.pipe(process.stdout, { end: false });
  runner.stderr.pipe(process.stderr, { end: false });
  runner.on('exit', function (status) {
    if (status === 0) {
      if (callback) callback();
    } else {
      process.exit(status);
    }
  });
}

compileJs = function (opts) {
  opts = _.assign({

  }, opts);

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
};

compileCss = function (opts) {
  opts = _.assign({

  }, opts);

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
};

startServer = function (opts) {
  opts = _.assign({
    skipWatch: false,
    envVariables: {}
  }, opts);

  var
    runner,
    command = '',
    isWin = /^win/.test(process.platform),
    variables = [];

  for (key in opts.envVariables) {
    variables.push(key + '=' + opts.envVariables[key]);
  }

  if (variables.length) command += isWin ? ('set ' + variables.join(' ') + ' && ') : (variables.join(' ') + ' ');
  command += opts.skipWatch ? 'node' : 'nodemon';
  command += ' index.js';

  runner = exec(command);
  proxy(runner);
};

gulp.task('symlink', function () {
  for (var key in SYMLINKS) {
    createSymlink(key, SYMLINKS[key]);
  };
});


// ===============================================================
// TEST
// ===============================================================

gulp.task('jscs', function () {
  gulp
    .src(['./client/**/*.js', './server/**/*.js', './config/**/*.js', './libs/**/*.js'])
    .pipe(jscs())
    // hook to check over than 16 files
    // see https://github.com/jscs-dev/gulp-jscs/issues/22
    .pipe(through2.obj(function(file, encoding, callback) {
      callback();
    }));
});

gulp.task('test', ['jscs']);


// ===============================================================
// DEVELOPMENT
// ===============================================================

gulp.task('server:dev', function () {
  startServer();
});

gulp.task('js', function () {
  compileJs();
});

gulp.task('css', function () {
  compileCss();
});

gulp.task('watch', function () {
  gulp.watch('./stylesheets/**/*.styl', ['css']);
  gulp.watch('./client/**/*.js', ['js']);
});

gulp.task('dev', ['server:dev', 'js', 'css', 'watch']);


// ===============================================================
// STAGING
// ===============================================================

gulp.task('server:staging', function () {
  startServer({
    skipWatch: true,
    envVariables: {
      NODE_ENV: 'staging'
    }
  });
});

gulp.task('staging', ['server:staging', 'js', 'css']);
gulp.task('assets:staging', ['js', 'css']);
