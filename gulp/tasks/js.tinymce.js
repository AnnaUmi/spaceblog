'use strict';

module.exports = function() {
  $.gulp.task('js:tinymce', function() {
    return $.gulp.src($.path.jsTinymce)
      .pipe($.gp.concat('tinymce.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
