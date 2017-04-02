var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  }).on('restart', function() {
    console.log('Restarting...');
  });
});

gulp.task('testu', function() {
  env({
    vars: {
      ENV: 'Test'
    }
  });
  gulp.src('tests/controllers/*.js')
  .pipe(gulpMocha({
    reporter: 'nyan'
  }));
});

gulp.task('testi', function() {
  env({
    vars: {
      ENV: 'Test'
    }
  });

  gulp.src('tests/integration/*.js')
    .pipe(gulpMocha({
      reporter: 'nyan'
    }));
});
