var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var minify = false;

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'js', 'css', 'fonts']);

gulp.task('fonts', function () {
    var src = [
        './bower_components/ionic/release/fonts/*',
    ];
    var fonts = gulp.src(src)
      .pipe(gulp.dest('./www/fonts/'));
    return fonts;
});

gulp.task('js', function () {
    var src = [
        './bower_components/ionic/release/js/*.js',
        './bower_components/ionic-material/dist/*.js',
    ];
    var js = gulp.src(src)
        .pipe(gulp.dest('./www/js'));
    return js;
});

gulp.task('css', function () {
    var src = [
        './bower_components/ionic-material/dist/*.css',
    ];
    var css = gulp.src(src)
        .pipe(gulp.dest('./www/css'));
    return css;
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});