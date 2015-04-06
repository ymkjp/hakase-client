/**
 * http://qiita.com/kouh/items/823737d48faefd9fe3a0
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');


gulp.task('jshint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('image', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('flag', function () {
  return gulp.src('app/bower_components/flag-icon-css/flags/**/*.svg')
    .pipe(gulp.dest('dist/flags'));
});

gulp.task('sample', function () {
  return gulp.src('app/sample/**/*.json')
    .pipe($.jsonminify())
    .pipe(gulp.dest('dist/sample'));
});

gulp.task('bower_components', function () {
  return gulp.src('app/bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('partial_html', function () {
  return gulp.src('app/partials/**/*.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('dist/partials'));
});

gulp.task('scss',function(){
//  return gulp.src('app/scss/**/*.scss')
//    .pipe($.rubySass({
//      style: 'expaned',
//    }))
//    .pipe($.autoprefixer('last 1 version'))
//    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html',function(){
  var assets = $.useref.assets({searchPath: ['.tmp','app']});
  return gulp.src('app/{index.html, partials/**/.html}')
    .pipe(assets)
    .pipe($.if('*.js',$.uglify({preserveComments: 'some'})))
    .pipe($.if('*.css',$.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html',$.minifyHtml()))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean',function(cb){
  rimraf('dist',cb);
});

gulp.task('watch',function(){
  browserSync.init({
    server:{
      baseDir: ['app','.tmp']
    },
    notify: false
  });

  gulp.watch(['app/scss/**/*.scss'], ['scss']);
  gulp.watch(['app/**/*.html'], browserSync.reload);
  gulp.watch(['{.tmp,app}/css/**/*.css'], browserSync.reload);
  gulp.watch(['app/js/**/*.js'], ['jshint',browserSync.reload]);
  gulp.watch(['app/images/**/*'], browserSync.reload);
  gulp.watch(['app/sample/**/*.json'], browserSync.reload);
});

gulp.task('build', function (cb) {
  runSequence('clean','scss', ['jshint', 'html', 'image', 'sample', 'flag', 'partial_html', 'bower_components'], cb);
});

gulp.task('default',['watch']);
