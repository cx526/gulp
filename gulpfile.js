const gulp = require('gulp')
// 常用指令(通过gulp+任务名完成)
/*
  1.gulp.src() 找到源文件的路径
  2.gulp.dest() 找到目的文件的路径
  3.pipe() 程序运行管道
*/
// 1.整理.html文件
gulp.task('copy-html', function() {
  return gulp.src('*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload())
})
// 2.整理静态图片(images所有的图片打包到dist文件夹下的images里)
gulp.task('images', function() {
  return gulp.src('images/**/*')
  .pipe(gulp.dest('dist/images'))
  .pipe(connect.reload())
})
// 3.整理多个文件到同一文件夹下(!表不打包)
gulp.task('js', function() {
  return gulp.src(['js/*.js'])
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload())
})

// 第三方插件的使用
/*
  1.cnpm/npm下载第三方插件
  2.导入下载完的第三方插件
*/
const sass = require('gulp-sass')
// 压缩css
const css = require('gulp-mini-css')
// 保持两个版本
const rename = require("gulp-rename");
gulp.task('sass', function() {
  return gulp.src('style/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(css())
  .pipe(rename('index.min.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload())
})

// 一次同时执行多个任务(异步执行)
gulp.task('build', ['copy-html', 'images', 'js', 'sass', 'serve'], function() {
  console.log('完成了')
})
// 监听当前项目文件改变(热更新)
gulp.task('watch', function() {
  // 接收两个参数，第一个为当前更新文件的路径，第二个为执行的任务名(都用数组表示)
  gulp.watch(['*.html'], ['copy-html'])
  gulp.watch(['images/**/*'], ['images'])
  gulp.watch(['js/*.js'], ['js'])
  gulp.watch(['style/*.scss'], ['scss'])
})


// 开启本地服务
const connect = require("gulp-connect");
gulp.task('serve', function() {
  connect.server({
    root: "dist",
    port: 8080,
    livereload: true,
  })
})

// 同时启动热更新和本地服务
gulp.task('default', ['watch', 'serve'])

