var
  SYMLINKS,
  VENDOR,
  createSymlink,
  proxy,
  compileCss,
  startServer,
  compileAppJs,
  compileVendorJs,
  _ = require('lodash'),
  pkg = require('./package.json'),
  path = require('path'),
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  nib = require('nib'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  symlink = require('gulp-symlink'),
  jscs = require('gulp-jscs'),
  through2 = require('through2'),
  exec = require('child_process').exec,
  aliasify = require('aliasify');


VENDOR = [
  '!underscore',
  'lodash',
  'alt',
  'backbone',
  'backbone.localstorage',
  'classnames',
  'dropzone',
  'jquery',
  'moment',
  'page',
  'q',
  'querystring'
];

SYMLINKS = {
  'config': './config > node_modules',
  'libs': './libs > node_modules',
  'client': './client > node_modules',
  'server': './server > node_modules'
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

compileVendorJs = function (opts) {
  opts = _.assign({

  }, opts);

  var bundle = browserify();

  _.forEach(VENDOR, function (vendor) {
    if (!_.startsWith(vendor, '!')) {
      bundle.require(vendor, { expose: vendor });
    } else {
      bundle.exclude(vendor.substr(1));
    }
  });

  bundle.transform({ global: true }, aliasify);

  bundle.bundle()
    .on('error', function (err) { console.log(err.message) })
    .pipe(source('vendor.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/assets'));
};

compileAppJs = function (opts) {
  opts = _.assign({
    minify: false
  }, opts);

  var bundle = browserify({
    entries: ['./client/index.js'],
    paths: ['./node_modules']
  });

  _.forEach(VENDOR, function (lib) {
    bundle.exclude(_.startsWith(lib, '!') ? lib.substr(1) : lib);
  });

  bundle.transform({ global: true }, aliasify);

  bundle = bundle
    .bundle()
    .on('error', function (err) { console.log(err.message) })
    .pipe(source('script.js'));

  if (opts.minify) bundle = bundle.pipe(streamify(uglify()));

  bundle.pipe(gulp.dest('./public/assets'));
};

compileCss = function (opts) {
  opts = _.assign({
    minify: false
  }, opts);

  var task = gulp.src('./stylesheets/index.styl')
  .pipe(stylus({
    'paths': [path.join(__dirname, '/node_modules')],
    'include css': true,
    'use': [nib()],
    'urlfunc': 'embedurl',
    'linenos': true,
    'define': {
      '$version': pkg.version
    }
  }));
  task = task.pipe(rename('style.css'));
  if (opts.minify) task = task.pipe(minifyCSS());
  task = task.pipe(gulp.dest('./public/assets/'));
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

gulp.task('js:app', function () {
  compileAppJs();
});

gulp.task('js:vendor', function () {
  compileVendorJs();
});

gulp.task('js', ['js:app', 'js:vendor']);

gulp.task('css', function () {
  compileCss();
});

gulp.task('watch', function () {
  gulp.watch('./stylesheets/**/*.styl', ['css']);
  gulp.watch('./client/**/*.js', ['js:app']);
});

gulp.task('assets', ['js', 'css']);
gulp.task('dev', ['server:dev', 'js', 'css', 'watch']);


// ===============================================================
// STAGING
// ===============================================================

gulp.task('js:app:min', function () {
  compileAppJs({ minify: true });
});

gulp.task('js:min', ['js:vendor', 'js:app:min']);

gulp.task('css:min', function () {
  compileCss({ minify: true });
});

gulp.task('server:staging', function () {
  startServer({
    skipWatch: true,
    envVariables: {
      NODE_ENV: 'staging'
    }
  });
});

gulp.task('assets:min', ['js:min', 'css:min']);
gulp.task('staging', ['server:staging', 'assets:min']);
