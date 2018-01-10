'use strict';

module.exports = function() {
  $.gulp.task('copy:js', function() {
    return $.gulp.src('./source/js/**/*.*', { since: $.gulp.lastRun('copy:js') })
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};


