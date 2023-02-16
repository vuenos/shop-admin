const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
//const imagemin = require('gulp-imagemin');

// 일반 컴파일
gulp.task('sass', function () {
  return gulp.src('./src/assets/sass/*.scss')  // 입력 경로
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css/'));  // 출력 경로
});

// Images Task
// gulp.task('images', function() {
//   return gulp.src('./src/assets/images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./public/assets/images/'));
// });

// 런타임 중 파일 감시
gulp.task('watch', function () {
  gulp.watch('./src/assets/sass/*.scss', gulp.series('sass'));
  //gulp.watch('./src/assets/images/*', gulp.series('images'));
});

// Default Task
gulp.task('default', gulp.parallel('sass'));