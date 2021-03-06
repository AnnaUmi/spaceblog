'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  nodemon: require('nodemon'),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:fonts',
    'copy:js',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'nodemon'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

