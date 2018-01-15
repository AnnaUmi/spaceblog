module.exports = function() {
  $.gulp.task('css:tinymce', function() {
    return $.gulp.src($.path.jsTinymce)
      .pipe($.gp.concat('theme.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js/themes/modern/'))
  })
};
