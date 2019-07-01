var gulp = require('gulp');

var connect = require('gulp-connect');

gulp.task('webserver',function(){

   connect.server({

      livereload:true,
      port:1024,
      host: '0.0.0.0'

   });

});

gulp.task('default',['webserver']);
