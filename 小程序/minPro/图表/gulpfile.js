// var gulp = require('gulp');

// var connect = require('gulp-connect');
// var autoprefixer = require('gulp-autoprefixer');
// gulp.task('webserver', function () {  
//       connect.server({   
//             livereload: true,
//                port: 1024,
//             host: '0.0.0.0'  
//       });

// });
// gulp.task('default', ['webserver']);
// //gulp testAutoFx   css auto
// gulp.task('testAutoFx', function () {
//       gulp.src('css/style.css')
//             .pipe(autoprefixer({
//                   browsers: ['last 2 versions', 'Android >= 4.0' , 'iOS 7'],
//                   cascade: true, //是否美化属性值 默认：true 像这样：
//                   //-webkit-transform: rotate(45deg);
//                   //        transform: rotate(45deg);
//                   remove: false //是否去掉不必要的前缀 默认：true 
//             }))
//             .pipe(gulp.dest('dist/css'));
// });

var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
gulp.task('webserver', function () {
    connect.server({
          livereload: true,
          port: 1024,
          host: '0.0.0.0'
    });
});
gulp.task('browser', () =>{
    console.log('browser')
    gulp.src('css/common/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
      cascade: false
      }))
  .pipe(gulp.dest('dist/css/common'))
    gulp.src('css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
});
gulp.task('html',()=>{
      gulp.src('*.html')
     .pipe(gulp.dest('dist'))
})
gulp.task('commJs',()=>{
    gulp.src('js/commJs/*.js')
    .pipe(gulp.dest('dist/js/commJs'))
    gulp.src('js/highchart/*/*.js')
    .pipe(gulp.dest('dist/js/highchart'))
})
gulp.task('imgs',()=>{
    gulp.src('imgs/*/*/*')
    .pipe(gulp.dest('dist/imgs/'))
})
gulp.task('watch', function () {
    console.log('wathc监听呢')
    gulp.watch('css/*.scss', ['browser'],function(){
          console.log('//////////browser')
    })
    gulp.watch('*.html', ['html'],function(){
        console.log('//////////html')
  })

})
gulp.task('default', () =>{
    console.log('doing....')    

})
//,['browser']
gulp.task('default',['webserver','browser','html','commJs','watch','imgs']);