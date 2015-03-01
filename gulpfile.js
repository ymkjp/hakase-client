/** gulpfile.js */
var gulp      = require('gulp');
var recursive = require('recursive-readdir');

gulp.task('recursiveTask', function(callback) {
    recursive('./gulp', function (err, files) {
        files.forEach(function(path, index, arry) {
            path = './' + path.replace('\\', '/' );
            require(path)(gulp);
        });
        callback();
    });
});

gulp.task('default', ['recursiveTask'], function() {
    gulp.start(['js-minify', 'css-minify']);
});
